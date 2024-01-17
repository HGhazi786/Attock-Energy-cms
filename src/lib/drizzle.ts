import {pgTable,varchar,integer,serial,text,timestamp,date,boolean} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: Number(process.env.PGSQL_PORT),
    database: process.env.PGSQL_DATABASE,
  });
}

export const clientTable = pgTable("client", {
  user_id: serial("user_id").primaryKey(),
  username: varchar("username", { length: 55 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  contact_details: varchar("contact_details", { length: 255 }),
  system_size: integer("system_size"),
  invoice_required: boolean("invoice_required"),
  date_of_installation: date("date_of_installation"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const complaintTable = pgTable("complaints", {
  complaint_id: serial("complaint_id").primaryKey(),
  title: varchar("title", { length: 55 }).notNull(),
  description: text("description"),
  user_id: integer("user_id").references(() => clientTable.user_id),
  action: text("action"),
  payment_status: boolean("payment_status"),
  status: boolean("status"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const proposalTable = pgTable("proposal", {
  refno : integer("refno"),
  name : varchar("name",{length:55}),
  address: varchar("address",{length:55}),
  city: varchar("city",{length:55}),
  phno:integer("phno"),
  panels:integer("panels"),
  pnlsize:integer("pnlsize"),
  sys_size :integer("sys_size"),
  inv_size :integer("inv_size"),
  pnl_brand : varchar("pnl_brand",{length:55}),
  inv_brand : varchar("inv_brand",{length:55}),
  aepl_charges :integer("aepl_charges"),
  sub_charges :integer("sub_charges"),
  discount :integer("discount"),
  total :integer("total"),
  cust_struct : varchar("cust_struct",{length:55}),
  warranty :integer("warranty"),
  tilt :integer("tilt")
});

export const db = drizzle(conn);