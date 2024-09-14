"use client";

import { createTheme, MantineProvider as AMantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { PropsWithChildren } from "react";
import "dayjs/locale/vi";

const theme = createTheme({});

export function MantineProvider({ children }: PropsWithChildren) {
  return (
    <AMantineProvider theme={theme}>
      <DatesProvider settings={{ locale: "vi" }}>{children}</DatesProvider>
    </AMantineProvider>
  );
}
