export type SavingsPeriod = "day" | "week" | "month"

export const METRICS_ASSUMPTIONS = {
  productsPerDay: 100,
  manualMinutesPerProduct: 5,
  botSecondsPerProduct: 30,
  workHoursPerDay: 8,
  workDaysPerMonth: 22,
} as const

export interface PeriodMetrics {
  period: SavingsPeriod
  periodLabel: string
  savingsMinutes: number
  manualMinutes: number
  botMinutes: number
}

export interface FormattedMinutes {
  value: string
  slots: string[]
}

const MAX_DIGIT_SLOTS = 4

const PERIOD_CONFIG: Record<
  SavingsPeriod,
  { label: string; savingsLabel: string; multiplier: number }
> = {
  day: { label: "День", savingsLabel: "за день", multiplier: 1 },
  week: { label: "Неделя", savingsLabel: "за неделю", multiplier: 7 },
  month: { label: "Месяц", savingsLabel: "за месяц", multiplier: METRICS_ASSUMPTIONS.workDaysPerMonth },
}

export const SAVINGS_PERIODS = Object.entries(PERIOD_CONFIG).map(([id, config]) => ({
  id: id as SavingsPeriod,
  label: config.label,
  savingsLabel: config.savingsLabel,
}))

function getDailyMinutes() {
  const { productsPerDay, manualMinutesPerProduct, botSecondsPerProduct } = METRICS_ASSUMPTIONS
  const manualMinutes = productsPerDay * manualMinutesPerProduct
  const botMinutes = productsPerDay * (botSecondsPerProduct / 60)

  return { manualMinutes, botMinutes, savingsMinutes: manualMinutes - botMinutes }
}

export function getMetricsForPeriod(period: SavingsPeriod): PeriodMetrics {
  const { manualMinutes, botMinutes, savingsMinutes } = getDailyMinutes()
  const { savingsLabel, multiplier } = PERIOD_CONFIG[period]

  return {
    period,
    periodLabel: savingsLabel,
    savingsMinutes: Math.round(savingsMinutes * multiplier),
    manualMinutes: Math.round(manualMinutes * multiplier),
    botMinutes: Math.round(botMinutes * multiplier),
  }
}

export function formatMinutes(minutes: number): FormattedMinutes {
  const digits = String(minutes).split("")

  return {
    value: String(minutes),
    slots: Array.from({ length: MAX_DIGIT_SLOTS }, (_, index) => {
      const digitIndex = index - (MAX_DIGIT_SLOTS - digits.length)

      return digitIndex >= 0 ? digits[digitIndex] : ""
    }),
  }
}

function pluralizeRu(
  count: number,
  forms: { one: string; few: string; many: string },
) {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod100 >= 11 && mod100 <= 14) return forms.many
  if (mod10 === 1) return forms.one
  if (mod10 >= 2 && mod10 <= 4) return forms.few

  return forms.many
}

export function formatSavingsEquivalent(minutes: number) {
  const workMinutesPerDay = METRICS_ASSUMPTIONS.workHoursPerDay * 60

  if (minutes >= workMinutesPerDay) {
    const days = Math.ceil(minutes / workMinutesPerDay)
    const daysLabel = pluralizeRu(days, {
      one: "день",
      few: "дня",
      many: "дней",
    })

    return `~${days} ${daysLabel}`
  }

  const hours = Math.ceil(minutes / 60)
  const hoursLabel = pluralizeRu(hours, {
    one: "час",
    few: "часа",
    many: "часов",
  })

  return `~${hours} ${hoursLabel}`
}
