import { db } from "@/server/db";
import { SearchTransactionRequest, Transaction } from "@/shared/transaction.type";
import dayjs from "dayjs";
import { SQL, sql } from "drizzle-orm";

const validOrderDirections = ["asc", "desc"];
const validOrderBys = ["amount", "time"];

class TransactionService {
  public async search({
    q,
    pageNumber,
    pageSize,
    fromTime,
    toTime,
    fromAmount,
    toAmount,
    orderBy,
    orderDirection,
  }: SearchTransactionRequest): Promise<Transaction[]> {
    if (!pageSize || pageSize <= 0) {
      pageSize = 10;
    }
    if (pageSize > 1000) {
      pageSize = 1000;
    }
    if (!pageNumber || pageNumber <= 0) {
      pageNumber = 1;
    }
    const limit = pageSize;
    const offset = (pageNumber - 1) * limit;
    const builder: SQL[] = [];
    builder.push(sql`select id, code, note, time, amount, name from _transaction where 1=1`);
    if (q) {
      builder.push(sql`and (note like ${`%${q}%`} or name like ${`%${q}%`})`);
    }
    if (fromTime) {
      builder.push(sql`and time >= ${dayjs(fromTime).startOf("day").unix()}`);
    }
    if (toTime) {
      builder.push(sql`and time <= ${dayjs(toTime).endOf("day").unix()}`);
    }
    if (fromAmount) {
      builder.push(sql`and amount >= ${fromAmount}`);
    }
    if (toAmount) {
      builder.push(sql`and amount <= ${toAmount}`);
    }
    if (orderBy && validOrderBys.includes(orderBy)) {
      if (!orderDirection || !validOrderDirections.includes(orderDirection.toLowerCase())) {
        orderDirection = "desc";
      }
      builder.push(sql.raw(`order by ${orderBy} ${orderDirection}`));
    }
    builder.push(sql`limit ${limit} offset ${offset}`);
    return db.all(sql.join(builder, sql` `));
  }
}

export const transactionService = new TransactionService();
