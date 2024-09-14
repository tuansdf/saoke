import { transactionService } from "@/server/transaction.service";
import { SearchTransactionRequest } from "@/shared/transaction.type";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const req: SearchTransactionRequest = {
    q: searchParams.get("q"),
    pageNumber: Number(searchParams.get("pageNumber")),
    pageSize: Number(searchParams.get("pageSize")),
    fromTime: searchParams.get("fromTime"),
    toTime: searchParams.get("toTime"),
    orderBy: searchParams.get("orderBy"),
    orderDirection: searchParams.get("orderDirection"),
    fromAmount: Number(searchParams.get("fromAmount")),
    toAmount: Number(searchParams.get("toAmount")),
  };
  const result = await transactionService.search(req);
  return Response.json(result);
}
