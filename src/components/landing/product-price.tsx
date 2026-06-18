import {
  DISCOUNT_PERCENT,
  formatPrice,
  PRICING,
} from "@/lib/constants"
import { cn } from "@/lib/utils"

interface ProductPriceProps {
  className?: string
  size?: "sm" | "md"
  showPeriod?: boolean
  variant?: "default" | "inverted"
}

export function ProductPrice({
  className,
  size = "md",
  showPeriod = true,
  variant = "default",
}: ProductPriceProps) {
  const isSmall = size === "sm"
  const isInverted = variant === "inverted"

  return (
    <div className={cn("inline-flex flex-col items-start gap-0", className)}>
      <div className={cn("relative inline-block", isSmall ? "pr-7" : "pr-9")}>
        <span
          className={cn(
            "absolute -top-1.5 right-0 translate-x-1.5 rounded px-1 py-0.5 font-semibold leading-none text-white bg-brand-accent",
            isSmall ? "text-[10px]" : "text-xs",
          )}
        >
          −{DISCOUNT_PERCENT}%
        </span>
        <span
          className={cn(
            "font-semibold leading-none",
            isSmall ? "text-sm" : "text-lg",
            isInverted ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {formatPrice(PRICING.newPrice)}
          {showPeriod && PRICING.period}
        </span>
      </div>

      <span
        className={cn(
          "mt-0.5 line-through decoration-current/60 leading-none",
          isSmall ? "text-[calc(0.875rem-2pt)]" : "text-[calc(1.125rem-2pt)]",
          isInverted ? "text-primary-foreground/55" : "text-muted-foreground",
        )}
      >
        {formatPrice(PRICING.oldPrice)}
      </span>
    </div>
  )
}
