import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProductBeatProps {
  index: number;
  heading: string;
  sentence: string;
  visual: ReactNode;
  reversed?: boolean;
}

export function ProductBeat({
  index,
  heading,
  sentence,
  visual,
  reversed,
}: ProductBeatProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
        reversed ? "lg:grid-flow-col-dense" : "",
      )}
    >
      <div className={cn("space-y-4", reversed ? "lg:col-start-2" : "")}>
        <span
          className={cn(
            "font-mono text-sm font-medium tabular-nums",
            ["text-gruv-accent-deep", "text-gruv-aqua", "text-gruv-purple"][
              index % 3
            ],
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-gruv-fg sm:text-3xl">
          {heading}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-gruv-fg-body sm:text-lg">
          {sentence}
        </p>
      </div>
      <div
        className={cn(
          "dark relative aspect-[16/10] overflow-hidden rounded-2xl border border-gruv-border/70 bg-gruv-bg shadow-frame transition-colors duration-300 hover:border-gruv-border",
          reversed ? "lg:col-start-1" : "",
        )}
      >
        {visual}
      </div>
    </div>
  );
}
