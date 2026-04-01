"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

export function TradeChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
        fontSize: 11,
        attributionLogo: false,
      },
      width: el.clientWidth,
      height: 180,
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "rgba(30, 41, 59, 0.85)" },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    const series = chart.addAreaSeries({
      lineColor: "#22d3ee",
      topColor: "rgba(34, 211, 238, 0.4)",
      bottomColor: "rgba(34, 211, 238, 0.02)",
      lineWidth: 2,
    });

    const now = Math.floor(Date.now() / 1000);
    const data = Array.from({ length: 80 }, (_, i) => ({
      time: (now - (80 - i) * 60) as import("lightweight-charts").UTCTimestamp,
      value: 67432 + Math.sin(i * 0.15) * 600 + i * 12,
    }));
    series.setData(data);
    chart.timeScale().fitContent();

    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, []);

  return <div ref={containerRef} className="h-[180px] w-full" />;
}
