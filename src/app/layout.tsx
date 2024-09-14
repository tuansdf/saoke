import { MantineProvider } from "@/client/libs/mantine-provider";
import { ColorSchemeScript } from "@mantine/core";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sao kê",
  description: "Sao kê",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
