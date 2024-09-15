"use client";

import { SearchTransactionPagination } from "@/client/components/search-transaction-pagination";
import { SearchResponse, Transaction } from "@/shared/transaction.type";
import { Box, LoadingOverlay, Table } from "@mantine/core";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const DATE_FORMAT_FRONTEND = "DD/MM/YYYY HH:mm:ss";
const moneyFormat = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const searchTransactions = async (search?: string): Promise<SearchResponse<Transaction[]>> => {
  const result = await fetch(`/api/transactions/search?${search}`, {
    method: "GET",
  });
  if (!result.ok) return {};
  return await result.json();
};

export function SearchTransactionTable() {
  const searchParams = useSearchParams();
  const transactionsQuery = useSWR(
    `/api/transactions/search?${searchParams.toString()}`,
    () => searchTransactions(searchParams.toString()),
    {
      keepPreviousData: true,
    },
  );
  const transactions = transactionsQuery.data;

  return (
    <Box mt="md" pos="relative">
      <SearchTransactionPagination totalCount={transactions?.totalCount || 0} />
      <Table.ScrollContainer minWidth={700} my="md">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Thời gian</Table.Th>
              <Table.Th>Số tiền</Table.Th>
              <Table.Th>Nội dung</Table.Th>
              <Table.Th>Tên</Table.Th>
              <Table.Th>Nguồn</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {transactions?.data?.map((item) => {
              return (
                <Table.Tr key={item.id}>
                  <Table.Td>{dayjs(Number(item.time) * 1000).format(DATE_FORMAT_FRONTEND)}</Table.Td>
                  <Table.Td>{moneyFormat.format(Number(item.amount))}</Table.Td>
                  <Table.Td>{item.note}</Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.source}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <SearchTransactionPagination totalCount={transactions?.totalCount || 0} />

      <LoadingOverlay visible={transactionsQuery.isLoading} zIndex={1000} />
    </Box>
  );
}
