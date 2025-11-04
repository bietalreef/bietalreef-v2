import { 
  int, 
  mysqlEnum, 
  mysqlTable, 
  text, 
  timestamp, 
  varchar,
  decimal,
  json,
  index,
  uniqueIndex
} from "drizzle-orm/mysql-core";
import { users } from "./schema";

/**
 * Cart System + Payment System - Bietalreef
 * Complete schema for cart, orders, payments, and inventory
 */

// 1. Products Table (منتجات)
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  salePrice: decimal("salePrice", { precision: 12, scale: 2 }),
  sku: varchar("sku", { length: 100 }).unique(),
  stock: int("stock").default(0).notNull(),
  category: varchar("category", { length: 100 }),
  images: json("images").$type<string[]>().default([]),
  metadata: json("metadata").$type<Record<string, any>>().default({}),
  isActive: int("isActive").default(1).notNull(), // 1 = active, 0 = inactive
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  categoryIdx: index("idx_category").on(table.category),
  stockIdx: index("idx_stock").on(table.stock),
}));

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// 2. Carts Table (سلات التسوق)
export const carts = mysqlTable("carts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id, { onDelete: "cascade" }),
  anonToken: varchar("anonToken", { length: 255 }), // للزوار غير المسجلين
  status: mysqlEnum("status", ["active", "checked_out", "abandoned"]).default("active").notNull(),
  currency: varchar("currency", { length: 3 }).default("AED").notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).default("0").notNull(),
  metadata: json("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdx: index("idx_user_id").on(table.userId),
  anonIdx: index("idx_anon_token").on(table.anonToken),
  statusIdx: index("idx_status").on(table.status),
  updatedIdx: index("idx_updated_at").on(table.updatedAt),
}));

export type Cart = typeof carts.$inferSelect;
export type InsertCart = typeof carts.$inferInsert;

// 3. Cart Items Table (عناصر السلة)
export const cartItems = mysqlTable("cart_items", {
  id: int("id").autoincrement().primaryKey(),
  cartId: int("cartId").references(() => carts.id, { onDelete: "cascade" }).notNull(),
  productId: int("productId").references(() => products.id, { onDelete: "cascade" }).notNull(),
  qty: int("qty").default(1).notNull(),
  unitPrice: decimal("unitPrice", { precision: 12, scale: 2 }).notNull(),
  totalPrice: decimal("totalPrice", { precision: 12, scale: 2 }).notNull(),
  metadata: json("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  cartIdx: index("idx_cart_id").on(table.cartId),
  productIdx: index("idx_product_id").on(table.productId),
  uniqueCartProduct: uniqueIndex("idx_unique_cart_product").on(table.cartId, table.productId),
}));

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

// 4. Orders Table (الطلبات)
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id, { onDelete: "set null" }),
  cartId: int("cartId").references(() => carts.id, { onDelete: "set null" }),
  orderNumber: varchar("orderNumber", { length: 50 }).unique().notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("AED").notNull(),
  status: mysqlEnum("status", ["pending", "paid", "failed", "cancelled", "refunded"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  paymentMeta: json("paymentMeta").$type<Record<string, any>>().default({}),
  shippingAddress: json("shippingAddress").$type<Record<string, any>>(),
  billingAddress: json("billingAddress").$type<Record<string, any>>(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdx: index("idx_user_id").on(table.userId),
  statusIdx: index("idx_status").on(table.status),
  createdIdx: index("idx_created_at").on(table.createdAt),
}));

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// 5. Payments Table (المدفوعات)
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  userId: int("userId").references(() => users.id, { onDelete: "set null" }),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("AED").notNull(),
  status: mysqlEnum("status", ["pending", "processing", "succeeded", "failed", "refunded"]).default("pending").notNull(),
  provider: varchar("provider", { length: 50 }).notNull(), // stripe, paypal, cod
  transactionId: varchar("transactionId", { length: 255 }),
  paymentIntentId: varchar("paymentIntentId", { length: 255 }),
  metadata: json("metadata").$type<Record<string, any>>().default({}),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orderIdx: index("idx_order_id").on(table.orderId),
  userIdx: index("idx_user_id").on(table.userId),
  statusIdx: index("idx_status").on(table.status),
  transactionIdx: index("idx_transaction_id").on(table.transactionId),
}));

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

// 6. Inventory Alerts Table (تنبيهات المخزون)
export const inventoryAlerts = mysqlTable("inventory_alerts", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").references(() => products.id, { onDelete: "cascade" }).notNull(),
  stock: int("stock").notNull(),
  threshold: int("threshold").notNull(),
  status: mysqlEnum("status", ["pending", "sent", "resolved"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  productIdx: index("idx_product_id").on(table.productId),
  statusIdx: index("idx_status").on(table.status),
}));

export type InventoryAlert = typeof inventoryAlerts.$inferSelect;
export type InsertInventoryAlert = typeof inventoryAlerts.$inferInsert;
