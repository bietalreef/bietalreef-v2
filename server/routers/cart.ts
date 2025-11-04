import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { eq, and, sql } from "drizzle-orm";
import { carts, cartItems, products } from "../../drizzle/cart-schema";

/**
 * Cart Router - Bietalreef
 * Handles cart operations: add, update, remove, get cart
 */

export const cartRouter = router({
  // Get current user's cart
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const userId = ctx.user.id;

    // Get or create active cart
    let [cart] = await db
      .select()
      .from(carts)
      .where(and(eq(carts.userId, userId), eq(carts.status, "active")))
      .limit(1);

    if (!cart) {
      // Create new cart
      const [newCart] = await db.insert(carts).values({
        userId,
        status: "active",
        currency: "AED",
        total: "0",
      });
      cart = { id: newCart.insertId, userId, status: "active", currency: "AED", total: "0" } as any;
    }

    // Get cart items with product details
    const items = await db
      .select({
        id: cartItems.id,
        cartId: cartItems.cartId,
        productId: cartItems.productId,
        qty: cartItems.qty,
        unitPrice: cartItems.unitPrice,
        totalPrice: cartItems.totalPrice,
        product: {
          id: products.id,
          name: products.name,
          slug: products.slug,
          price: products.price,
          salePrice: products.salePrice,
          sku: products.sku,
          stock: products.stock,
          images: products.images,
        },
      })
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cart.id));

    return {
      cart,
      items,
    };
  }),

  // Add item to cart
  addItem: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        qty: z.number().min(1).default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userId = ctx.user.id;

      // Get or create cart
      let [cart] = await db
        .select()
        .from(carts)
        .where(and(eq(carts.userId, userId), eq(carts.status, "active")))
        .limit(1);

      if (!cart) {
        const [newCart] = await db.insert(carts).values({
          userId,
          status: "active",
          currency: "AED",
          total: "0",
        });
        cart = { id: newCart.insertId, userId, status: "active", currency: "AED", total: "0" } as any;
      }

      // Get product
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, input.productId))
        .limit(1);

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < input.qty) {
        throw new Error("Not enough stock");
      }

      const unitPrice = product.salePrice || product.price;
      const totalPrice = parseFloat(unitPrice) * input.qty;

      // Check if item already exists
      const [existingItem] = await db
        .select()
        .from(cartItems)
        .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, input.productId)))
        .limit(1);

      if (existingItem) {
        // Update quantity
        const newQty = existingItem.qty + input.qty;
        const newTotal = parseFloat(unitPrice) * newQty;

        await db
          .update(cartItems)
          .set({
            qty: newQty,
            totalPrice: newTotal.toString(),
          })
          .where(eq(cartItems.id, existingItem.id));
      } else {
        // Insert new item
        await db.insert(cartItems).values({
          cartId: cart.id,
          productId: input.productId,
          qty: input.qty,
          unitPrice: unitPrice.toString(),
          totalPrice: totalPrice.toString(),
        });
      }

      // Update cart total
      const [cartTotal] = await db
        .select({ total: sql<number>`SUM(${cartItems.totalPrice})` })
        .from(cartItems)
        .where(eq(cartItems.cartId, cart.id));

      await db
        .update(carts)
        .set({ total: (cartTotal.total || 0).toString() })
        .where(eq(carts.id, cart.id));

      return { success: true };
    }),

  // Update item quantity
  updateItem: protectedProcedure
    .input(
      z.object({
        itemId: z.number(),
        qty: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const [item] = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.id, input.itemId))
        .limit(1);

      if (!item) {
        throw new Error("Cart item not found");
      }

      // Check stock
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1);

      if (!product || product.stock < input.qty) {
        throw new Error("Not enough stock");
      }

      const newTotal = parseFloat(item.unitPrice) * input.qty;

      await db
        .update(cartItems)
        .set({
          qty: input.qty,
          totalPrice: newTotal.toString(),
        })
        .where(eq(cartItems.id, input.itemId));

      // Update cart total
      const [cartTotal] = await db
        .select({ total: sql<number>`SUM(${cartItems.totalPrice})` })
        .from(cartItems)
        .where(eq(cartItems.cartId, item.cartId));

      await db
        .update(carts)
        .set({ total: (cartTotal.total || 0).toString() })
        .where(eq(carts.id, item.cartId));

      return { success: true };
    }),

  // Remove item from cart
  removeItem: protectedProcedure
    .input(z.object({ itemId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const [item] = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.id, input.itemId))
        .limit(1);

      if (!item) {
        throw new Error("Cart item not found");
      }

      await db.delete(cartItems).where(eq(cartItems.id, input.itemId));

      // Update cart total
      const [cartTotal] = await db
        .select({ total: sql<number>`SUM(${cartItems.totalPrice})` })
        .from(cartItems)
        .where(eq(cartItems.cartId, item.cartId));

      await db
        .update(carts)
        .set({ total: (cartTotal.total || 0).toString() })
        .where(eq(carts.id, item.cartId));

      return { success: true };
    }),

  // Clear cart
  clearCart: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const userId = ctx.user.id;

    const [cart] = await db
      .select()
      .from(carts)
      .where(and(eq(carts.userId, userId), eq(carts.status, "active")))
      .limit(1);

    if (!cart) {
      return { success: true };
    }

    await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));

    await db
      .update(carts)
      .set({ total: "0" })
      .where(eq(carts.id, cart.id));

    return { success: true };
  }),
});
