"use client";

import { COINPLATE_SHELL } from "@/lib/coinplate/shell-classes";
import { usePathname } from "@/i18n/routing";
import { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideNav =
    pathname?.includes("/login") ||
    pathname?.startsWith("/news/") ||
    pathname?.includes("/deposit") ||
    pathname?.includes("/withdraw") ||
    pathname?.includes("/referral") ||
    pathname?.includes("/security") ||
    pathname?.includes("/records") ||
    pathname?.includes("/settings") ||
    pathname?.includes("/identity");

  return (
    <>
      <div className="min-h-screen bg-black md:flex md:justify-center md:px-4 md:py-6 lg:px-8 lg:py-10">
        <div
          className={`relative mx-auto min-h-screen bg-gradient-to-br from-black via-blue-950 to-black pb-24 shadow-glass ${COINPLATE_SHELL} md:min-h-[min(880px,92vh)] md:rounded-3xl md:border md:border-white/10 md:shadow-[0_0_60px_rgba(15,23,42,0.75)] lg:min-h-[min(900px,90vh)]`}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-40"
            aria-hidden
          >
            <div className="absolute -left-16 top-16 h-80 w-80 rounded-full bg-blue-500/30 blur-[100px]" />
            <div className="absolute -right-12 bottom-32 h-80 w-80 rounded-full bg-cyan-500/25 blur-[110px]" />
            <div className="absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sky-600/10 blur-[90px]" />
          </div>
          <div className="scanline-overlay rounded-[inherit]" />
          <div className="relative z-[1]">{children}</div>
        </div>
      </div>
      {!hideNav && <BottomNav />}
    </>
  );
}
