import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
  check,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
const date = (name) => integer(name, { mode: "timestamp_ms" });
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text("image"),
  createdAt: date("created_at").notNull(),
  updatedAt: date("updated_at").notNull(),
});
export const session = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: date("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => [index("session_user").on(t.userId)],
);
export const account = sqliteTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: date("access_token_expires_at"),
    refreshTokenExpiresAt: date("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull(),
  },
  (t) => [index("account_user").on(t.userId)],
);
export const verification = sqliteTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: date("expires_at").notNull(),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull(),
  },
  (t) => [index("verification_identifier").on(t.identifier)],
);
// One unit = 1/600 yuan. 100 units per second is exactly 30 yuan per 180 seconds.
export const wallets = sqliteTable(
  "wallets",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => user.id),
    balanceUnits: integer("balance_units").notNull().default(0),
    heldUnits: integer("held_units").notNull().default(0),
  },
  (t) => [
    check(
      "wallet_nonnegative",
      sql`${t.balanceUnits} >= 0 AND ${t.heldUnits} >= 0`,
    ),
  ],
);
export const ledger = sqliteTable(
  "ledger",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    kind: text("kind").notNull(),
    amountUnits: integer("amount_units").notNull(),
    reference: text("reference").notNull().unique(),
    createdAt: integer("created_at").notNull(),
  },
  (t) => [index("ledger_user").on(t.userId, t.createdAt)],
);
export const quotes = sqliteTable("quotes", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  assetId: text("asset_id").notNull(),
  durationMs: integer("duration_ms").notNull(),
  costUnits: integer("cost_units").notNull(),
  expiresAt: integer("expires_at").notNull(),
});
export const charges = sqliteTable("charges", {
  jobId: text("job_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  quoteId: text("quote_id").notNull().unique(),
  costUnits: integer("cost_units").notNull(),
  status: text("status").notNull(),
  createdAt: integer("created_at").notNull(),
});
export const topups = sqliteTable(
  "topups",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    requestId: text("request_id").notNull(),
    amountFen: integer("amount_fen").notNull(),
    paymentId: text("payment_id").unique(),
    codeUrl: text("code_url"),
    status: text("status").notNull(),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (t) => [uniqueIndex("topup_request").on(t.userId, t.requestId)],
);
export const paymentEvents = sqliteTable("payment_events", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull(),
  createdAt: integer("created_at").notNull(),
});
export const rateLimit = sqliteTable("rate_limit", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  count: integer("count").notNull(),
  lastRequest: integer("last_request", { mode: "number" }).notNull(),
});
