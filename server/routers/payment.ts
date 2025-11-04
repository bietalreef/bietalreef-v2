import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { eq, and } from "drizzle-orm";
import { carts, orders, payments } from "../../drizzle/cart-schema";

/**
 * Payment Router - Bietalreef
 * Handles checkout and payment processing
 */

export const paymentRouter = router({
  // Create checkout session
  createCheckout: protectedProcedure
    .input(
      z.object({
        paymentMethod: z.enum(["stripe", "paypal", "cod"]),
        shippingAddress: z.object({
          fullName: z.string(),
          phone: z.string(),
          address: z.string(),
          city: z.string(),
          country: z.string().default("UAE"),
        }),
        billingAddress: z.object({
          fullName: z.string(),
          phone: z.string(),
          address: z.string(),
          city: z.string(),
          country: z.string().default("UAE"),
        }).optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userId = ctx.user.id;

      // Get active cart
      const [cart] = await db
        .select()
        .from(carts)
        .where(and(eq(carts.userId, userId), eq(carts.status, "active")))
        .limit(1);

      if (!cart) {
        throw new Error("Cart not found");
      }

      if (parseFloat(cart.total) <= 0) {
        throw new Error("Cart is empty");
      }

      // Generate order number
      const orderNumber = `BR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create order
      const [order] = await db.insert(orders).values({
        userId,
        cartId: cart.id,
        orderNumber,
        amount: cart.total,
        currency: cart.currency,
        status: "pending",
        paymentMethod: input.paymentMethod,
        shippingAddress: input.shippingAddress as any,
        billingAddress: (input.billingAddress || input.shippingAddress) as any,
        notes: input.notes || null,
      });

      // Create payment record
      await db.insert(payments).values({
        orderId: order.insertId,
        userId,
        amount: cart.total,
        currency: cart.currency,
        status: "pending",
        provider: input.paymentMethod,
      });

      // Mark cart as checked out
      await db
        .update(carts)
        .set({ status: "checked_out" })
        .where(eq(carts.id, cart.id));

      // For COD, mark as paid immediately
      if (input.paymentMethod === "cod") {
        await db
          .update(orders)
          .set({ status: "paid" })
          .where(eq(orders.id, order.insertId));

        await db
          .update(payments)
          .set({ status: "succeeded" })
          .where(eq(payments.orderId, order.insertId));
      }

      return {
        orderId: order.insertId,
        orderNumber,
        amount: cart.total,
        currency: cart.currency,
        paymentMethod: input.paymentMethod,
      };
    }),

  // Get order details
  getOrder: protectedProcedure
    .input(z.object({ orderId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const [order] = await db
        .select()
        .from(orders)
        .where(eq(orders.id, input.orderId))
        .limit(1);

      if (!order) {
        throw new Error("Order not found");
      }

      // Get payment details
      const [payment] = await db
        .select()
        .from(payments)
        .where(eq(payments.orderId, input.orderId))
        .limit(1);

      return {
        order,
        payment,
      };
    }),

  // Get user orders
  getOrders: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const userId = ctx.user.id;

    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(orders.createdAt);

    return userOrders;
  }),

  // Process Stripe payment (webhook handler)
  processStripePayment: protectedProcedure
    .input(
      z.object({
        orderId: z.number(),
        paymentIntentId: z.string(),
        status: z.enum(["succeeded", "failed"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Update payment
      await db
        .update(payments)
        .set({
          status: input.status,
          paymentIntentId: input.paymentIntentId,
        })
        .where(eq(payments.orderId, input.orderId));

      // Update order
      if (input.status === "succeeded") {
        await db
          .update(orders)
          .set({ status: "paid" })
          .where(eq(orders.id, input.orderId));
      } else {
        await db
          .update(orders)
          .set({ status: "failed" })
          .where(eq(orders.id, input.orderId));
      }

      return { success: true };
    }),
});
