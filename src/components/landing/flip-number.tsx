"use client"

import { cn } from "@/lib/utils"

interface FlipNumberProps {
  slots: string[]
  className?: string
  ariaLabel?: string
}

const DIGITS = "0123456789"

export function FlipNumber({ slots, className, ariaLabel }: FlipNumberProps) {
  return (
    <span
      className={cn("inline-flex items-baseline tabular-nums leading-none", className)}
      aria-label={ariaLabel}
    >
      {slots.map((char, index) => (
        <OdometerSlot key={index} char={char} />
      ))}
    </span>
  )
}

function OdometerSlot({ char }: { char: string }) {
  const isVisible = char.length > 0
  const digitIndex = isVisible ? DIGITS.indexOf(char) : 0

  return (
    <span
      className={cn(
        "relative inline-block h-[1em] shrink-0 overflow-hidden align-baseline transition-[width] duration-300 ease-out motion-reduce:transition-none",
        isVisible ? "w-[0.62em]" : "w-0",
      )}
      style={{ lineHeight: 1 }}
      aria-hidden={!isVisible}
    >
      <span
        className="absolute inset-0 flex flex-col transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateY(-${digitIndex}em)` }}
      >
        {DIGITS.split("").map((digit) => (
          <span
            key={digit}
            className="flex h-[1em] w-full shrink-0 items-center justify-center leading-none"
          >
            {digit}
          </span>
        ))}
      </span>
    </span>
  )
}
