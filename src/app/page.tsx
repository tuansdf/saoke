"use client";

import { SearchTransactionForm } from "@/client/components/search-transaction-form";
import { Container } from "@mantine/core";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  return (
    <Container>
      <SearchTransactionForm
        initialValues={{
          q: searchParams.get("q"),
          pageNumber: searchParams.get("pageNumber") ? Number(searchParams.get("pageNumber")) : undefined,
          pageSize: searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : undefined,
          fromTime: searchParams.get("fromTime") ? dayjs(searchParams.get("fromTime")).toDate() : undefined,
          toTime: searchParams.get("toTime") ? dayjs(searchParams.get("toTime")).toDate() : undefined,
          fromAmount: searchParams.get("fromAmount") ? Number(searchParams.get("fromAmount")) : undefined,
          toAmount: searchParams.get("toAmount") ? Number(searchParams.get("toAmount")) : undefined,
          orderBy: searchParams.get("orderBy"),
          orderDirection: searchParams.get("orderDirection"),
        }}
      />
    </Container>
  );
}
