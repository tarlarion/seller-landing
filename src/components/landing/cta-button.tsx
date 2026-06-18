import { TelegramIcon } from "@/components/icons/telegram-icon"
import { Button } from "@/components/ui/button"
import { TELEGRAM_BOT_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface CtaButtonProps {
  className?: string
  size?: "default" | "lg" | "xl"
  variant?: "filled" | "ghost"
  label?: string
}

const ctaSizeStyles = {
  default: "gap-2 px-5 py-3 text-xs sm:text-sm [&_svg]:size-4",
  lg: "gap-2 px-6 py-3.5 text-sm [&_svg]:size-4",
  xl: "gap-3 px-9 py-5 text-sm sm:text-base [&_svg]:size-5",
} as const

export function CtaButton({
  className,
  size = "default",
  variant = "filled",
  label = "Подключить бота",
}: CtaButtonProps) {
  return (
    <Button
      asChild
      variant={variant === "ghost" ? "ghost" : "default"}
      size={size === "default" ? "default" : "lg"}
      className={cn(
        "h-auto rounded-full",
        ctaSizeStyles[size],
        variant === "ghost" && "text-foreground hover:bg-transparent",
        className,
      )}
    >
      <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
        <TelegramIcon />
        {label}
      </a>
    </Button>
  )
}
