import { db } from "@/server/db";
import { SearchResponse, SearchTransactionRequest, Transaction } from "@/shared/transaction.type";
import dayjs from "dayjs";
import { SQL, sql } from "drizzle-orm";

const validOrderDirections = ["asc", "desc"];
const validOrderBys = ["amount", "time"];

class TransactionService {
  public async search(data: SearchTransactionRequest): Promise<SearchResponse<Transaction[]>> {
    const countResult = await this.executeSearch(data, true);
    if (!!countResult.totalCount && countResult.totalCount > 0) {
      const dataResult = await this.executeSearch(data, false);
      dataResult.totalCount = countResult.totalCount;
      return dataResult;
    }
    return countResult;
  }

  private async executeSearch(
    {
      q,
      pageNumber,
      pageSize,
      fromTime,
      toTime,
      fromAmount,
      toAmount,
      orderBy,
      orderDirection,
    }: SearchTransactionRequest,
    isCount: boolean,
  ): Promise<SearchResponse<Transaction[]>> {
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

    if (isCount) {
      builder.push(sql`select count(*) as total from _transaction where 1=1`);
    } else {
      builder.push(sql`select id, code, note, time, amount, name from _transaction where 1=1`);
    }

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

    if (!isCount) {
      if (orderBy && validOrderBys.includes(orderBy)) {
        if (!orderDirection || !validOrderDirections.includes(orderDirection.toLowerCase())) {
          orderDirection = "desc";
        }
        builder.push(sql.raw(`order by ${orderBy} ${orderDirection}`));
      }
      builder.push(sql`limit ${limit} offset ${offset}`);
    }

    const result: SearchResponse<Transaction[]> = {};

    if (isCount) {
      result.totalCount = (db.get(sql.join(builder, sql` `)) as { total: number }).total;
    } else {
      result.data = db.all(sql.join(builder, sql` `));
      result.pageNumber = pageNumber;
      result.pageSize = pageSize;
    }

    return result;
  }
}

export const transactionService = new TransactionService();
