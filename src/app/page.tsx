import { HomePage } from "@/client/components/home-page";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
