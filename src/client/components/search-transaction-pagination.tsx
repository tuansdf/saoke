import { Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import classes from "./search-transaction-pagination.module.scss";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

type Props = {
  totalCount: number;
};

export function SearchTransactionPagination({ totalCount }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageNumberChange = (pageNumber: number) => {
    const search = new URLSearchParams(searchParams);
    search.set("pageNumber", String(pageNumber));
    router.replace(pathname + "?" + search.toString());
  };

  const pageSize = Number(searchParams.get("pageSize")) || DEFAULT_PAGE_SIZE;
  const pageNumber = Number(searchParams.get("pageNumber")) || DEFAULT_PAGE_NUMBER;

  return (
    <div className={classes["container"]}>
      <Pagination
        total={Math.ceil(Number(totalCount) / Number(pageSize))}
        onChange={handlePageNumberChange}
        value={pageNumber}
        boundaries={1}
        siblings={1}
      />
    </div>
  );
}
