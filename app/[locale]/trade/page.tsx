import { TradeView } from "@/components/coinplate/trade-view";
import { Suspense } from "react";

export default function TradePage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-gradient-to-br from-black via-blue-950 to-black" />}>
      <TradeView />
    </Suspense>
  );
}
