export type Transaction = {
  id: number | null | undefined;
  code: string | null | undefined;
  note: string | null | undefined;
  time: string | null | undefined;
  amount: number | null | undefined;
  name: string | null | undefined;
};

export type SearchTransactionRequest = {
  q?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
  fromTime?: string | null;
  toTime?: string | null;
  orderBy?: string | null;
  orderDirection?: string | null;
  fromAmount?: number | null;
  toAmount?: number | null;
};
