"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Web3Provider = dynamic(
  () =>
    import("@/context/Web3Provider").then((mod) => ({
      default: mod.Web3Provider,
    })),
  { ssr: false }
);

export function ClientWeb3Provider({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
