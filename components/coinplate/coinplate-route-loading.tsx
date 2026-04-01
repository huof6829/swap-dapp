"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function CoinplateRouteLoading() {
  return (
    <SkeletonTheme baseColor="#0d1410" highlightColor="#1a231e" borderRadius="0.75rem">
      <div className="px-4 pb-4 pt-4">
        <div className="mb-4 flex justify-between">
          <Skeleton width={120} height={28} />
          <Skeleton width={56} height={28} />
        </div>
        <Skeleton height={140} className="mb-3" />
        <Skeleton height={40} className="mb-5" />
        <div className="mb-6 grid grid-cols-4 gap-3">
          <Skeleton height={88} />
          <Skeleton height={88} />
          <Skeleton height={88} />
          <Skeleton height={88} />
        </div>
        <Skeleton width={100} height={20} className="mb-3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={56} className="mb-2" />
        ))}
      </div>
    </SkeletonTheme>
  );
}
