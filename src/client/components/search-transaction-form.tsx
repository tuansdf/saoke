"use client";

import classes from "@/client/components/search-transaction-form.module.scss";
import { Button, Card, NumberInput, Select, SelectProps, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const DATE_FORMAT_FRONTEND = "DD/MM/YYYY";
const DATE_FORMAT_BACKEND = "YYYY-MM-DD";

type FormValues = {
  q?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
  fromTime?: Date | null;
  toTime?: Date | null;
  fromAmount?: number;
  toAmount?: number;
  orderBy?: string | null;
  orderDirection?: string | null;
};

type Props = {
  initialValues: FormValues;
};

export function SearchTransactionForm({ initialValues }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, control } = useForm<FormValues>({ defaultValues: initialValues });

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    const search = new URLSearchParams();
    for (const key in data) {
      // @ts-expect-error don't care
      if (data[key]) {
        // @ts-expect-error don't care
        search.set(key, data[key]);
      }
    }
    if (data.fromTime) {
      search.set("fromTime", dayjs(data.fromTime).format(DATE_FORMAT_BACKEND));
    }
    if (data.toTime) {
      search.set("toTime", dayjs(data.toTime).format(DATE_FORMAT_BACKEND));
    }
    router.replace(pathname + "?" + search.toString());
  };

  return (
    <Card shadow="sm" p="lg">
      <form className={classes["form"]} onSubmit={handleSubmit(handleFormSubmit)}>
        <TextInput label="Tìm kiếm" {...register("q")} />
        <div className={classes["row"]}>
          <Controller
            control={control}
            name="fromTime"
            render={({ field: { value, onChange } }) => {
              return (
                <DatePickerInput label="Từ ngày" valueFormat={DATE_FORMAT_FRONTEND} value={value} onChange={onChange} />
              );
            }}
          />
          <Controller
            control={control}
            name="toTime"
            render={({ field: { value, onChange } }) => {
              return (
                <DatePickerInput
                  label="Đến ngày"
                  valueFormat={DATE_FORMAT_FRONTEND}
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
        </div>
        <div className={classes["row"]}>
          <Controller
            control={control}
            name="fromAmount"
            render={({ field: { value, onChange } }) => {
              return (
                <NumberInput
                  label="Từ số tiền (VNĐ)"
                  value={value}
                  onChange={onChange}
                  thousandSeparator=","
                  step={100_000}
                  min={Number.MIN_SAFE_INTEGER}
                  max={Number.MAX_SAFE_INTEGER}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="toAmount"
            render={({ field: { value, onChange } }) => {
              return (
                <NumberInput
                  label="Đến số tiền (VNĐ)"
                  value={value}
                  onChange={onChange}
                  thousandSeparator=","
                  step={100_000}
                  min={Number.MIN_SAFE_INTEGER}
                  max={Number.MAX_SAFE_INTEGER}
                />
              );
            }}
          />
        </div>
        <div className={classes["row"]}>
          <Controller
            control={control}
            name="orderBy"
            render={({ field: { value, onChange } }) => {
              return <Select label="Sắp xếp theo" value={value} onChange={onChange} data={orderByOptions} />;
            }}
          />
          <Controller
            control={control}
            name="orderDirection"
            render={({ field: { value, onChange } }) => {
              return <Select label="Thứ tự sắp xếp" value={value} onChange={onChange} data={orderDirectionOptions} />;
            }}
          />
        </div>
        <Button type="submit" mt="sm">
          Tìm kiếm
        </Button>
      </form>
    </Card>
  );
}

const orderByOptions: SelectProps["data"] = [
  {
    label: "Số tiền",
    value: "amount",
  },
  {
    label: "Ngày",
    value: "time",
  },
];
const orderDirectionOptions: SelectProps["data"] = [
  {
    label: "Tăng dần",
    value: "asc",
  },
  {
    label: "Giảm dần",
    value: "desc",
  },
];
