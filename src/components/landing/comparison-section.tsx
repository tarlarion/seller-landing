import { ProductPrice } from "@/components/landing/product-price"
import { Section, type SectionStackProps } from "@/components/landing/section"
import { landingContent } from "@/content/landing"
import { TELEGRAM_BOT_URL } from "@/lib/constants"

export function ComparisonSection({ stackIndex, isLastInStack }: SectionStackProps) {
  const { comparison } = landingContent

  return (
    <Section stackIndex={stackIndex} isLastInStack={isLastInStack}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {comparison.title}
        </h2>
        <p className="mt-3 text-base text-muted-foreground">{comparison.subtitle}</p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
        <article className="rounded-xl border border-border/70 bg-muted/30 p-6 sm:p-8">
          <p className="text-sm font-medium text-muted-foreground">{comparison.before.label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {comparison.before.price}
          </p>
          <ul className="mt-6 space-y-3">
            {comparison.before.points.map((point) => (
              <li key={point} className="text-sm leading-relaxed text-muted-foreground">
                {point}
              </li>
            ))}
          </ul>
        </article>

        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-primary/10 bg-primary p-6 text-primary-foreground transition-opacity hover:opacity-95 sm:p-8"
        >
          <p className="text-sm font-medium text-primary-foreground/70">{comparison.after.label}</p>
          <div className="mt-2">
            <ProductPrice variant="inverted" showPeriod />
          </div>
          <ul className="mt-6 space-y-3">
            {comparison.after.points.map((point) => (
              <li key={point} className="text-sm leading-relaxed text-primary-foreground/90">
                {point}
              </li>
            ))}
          </ul>
        </a>
      </div>
    </Section>
  )
}
