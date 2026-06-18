"use client"

import { useMemo, useState } from "react"
import savingsDayImage from "@/assets/1.png"
import savingsWeekImage from "@/assets/2.png"
import savingsMonthImage from "@/assets/3.png"
import { FlipNumber } from "@/components/landing/flip-number"
import {
  formatMinutes,
  formatSavingsEquivalent,
  getMetricsForPeriod,
  SAVINGS_PERIODS,
  type SavingsPeriod,
} from "@/lib/metrics-calculator"
import { cn } from "@/lib/utils"

const periodImages: Record<SavingsPeriod, { src: string; alt: string }> = {
  day: {
    src: savingsDayImage,
    alt: "Экономия времени за день",
  },
  week: {
    src: savingsWeekImage,
    alt: "Экономия времени за неделю",
  },
  month: {
    src: savingsMonthImage,
    alt: "Экономия времени за месяц",
  },
}

export function SavingsCalculator() {
  const [period, setPeriod] = useState<SavingsPeriod>("day")
  const metrics = useMemo(() => getMetricsForPeriod(period), [period])
  const periodImage = periodImages[period]

  const savings = formatMinutes(metrics.savingsMinutes)
  const savingsEquivalent = formatSavingsEquivalent(metrics.savingsMinutes)
  const timeRatio = Math.round(metrics.manualMinutes / metrics.botMinutes)

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-12 text-center sm:px-8 sm:py-16">
        <div className="flex w-full items-center justify-center gap-6 sm:gap-10">
          <div className="flex min-h-32 flex-col items-start justify-center text-left sm:min-h-40">
            <p className="text-sm font-medium text-muted-foreground">
              Экономия {metrics.periodLabel}
            </p>
            <div className="mt-3 flex items-end justify-start gap-1.5 sm:gap-2">
              <FlipNumber
                slots={savings.slots}
                ariaLabel={`${savings.value} минут`}
                className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
              />
              <span className="pb-1 text-2xl font-medium text-muted-foreground sm:text-3xl">
                мин
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              {savingsEquivalent}
            </p>
          </div>

          <div className="size-32 shrink-0 sm:size-40">
            <img
              key={period}
              src={periodImage.src}
              alt={periodImage.alt}
              width={480}
              height={480}
              className="size-full object-contain motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
            />
          </div>
        </div>

        <div className="mt-10 inline-flex w-full rounded-full border border-neutral-200 bg-neutral-100/80 p-1 sm:mt-12">
          {SAVINGS_PERIODS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPeriod(item.id)}
              className={cn(
                "flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-all duration-200 sm:px-4",
                period === item.id
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground sm:mt-12 sm:text-sm">
          При 100 товарах в день бот сокращает рутину примерно в {timeRatio} раза
        </p>
      </div>
    </div>
  )
}
