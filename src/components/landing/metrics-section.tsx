import { SavingsCalculator } from "@/components/landing/savings-calculator"
import { Section, type SectionStackProps } from "@/components/landing/section"
import { landingContent } from "@/content/landing"

export function MetricsSection({ stackIndex, isLastInStack }: SectionStackProps) {
  const { metrics } = landingContent

  return (
    <Section stackIndex={stackIndex} isLastInStack={isLastInStack}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {metrics.title}
        </h2>
        <p className="mt-3 text-pretty text-base text-muted-foreground">
          {metrics.subtitle}
        </p>
      </div>

      <SavingsCalculator />
    </Section>
  )
}
