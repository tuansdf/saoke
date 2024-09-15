"use client";

import { SearchTransactionForm } from "@/client/components/search-transaction-form";
import { SearchTransactionTable } from "@/client/components/search-transaction-table";
import { Box, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import classes from "./home-page.module.scss";

export function HomePage() {
  const searchParams = useSearchParams();

  return (
    <Box className={classes["container"]}>
      <Title size="h3">Sao kê đóng góp khắc phục thiệt hại bão Yagi</Title>
      <Text mt="0.125rem" mb="md" size="sm">
        Miễn trừ trách nhiệm: Thông tin được cung cấp từ MTTQVN, chúng tôi chỉ xử lý dữ liệu và giúp việc tìm kiếm, lọc
        dữ liệu đơn giản hơn.
      </Text>

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

      <SearchTransactionTable />
    </Box>
  );
}
