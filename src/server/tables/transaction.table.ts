import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const TransactionTable = sqliteTable(
  "_transaction",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    code: text("code", { mode: "text" }),
    note: text("note", { mode: "text" }),
    time: text("time", { mode: "text" }),
    amount: real("amount"),
    name: text("name", { mode: "text" }),
    bank: text("bank", { mode: "text" }),
    source: text("source", { mode: "text" }),
  },
  (table) => ({
    timeIndex: index("transaction_time_index").on(table.time),
    amountIndex: index("transaction_amount_index").on(table.amount),
  }),
);
