import { CtaButton } from "@/components/landing/cta-button"
import { Section, type SectionStackProps } from "@/components/landing/section"
import { landingContent } from "@/content/landing"

export function ChannelsSection({ stackIndex, isLastInStack }: SectionStackProps) {
  const { channels } = landingContent

  return (
    <Section stackIndex={stackIndex} isLastInStack={isLastInStack}>
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {channels.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {channels.subtitle}
            </p>
            <div className="mt-8 hidden lg:flex">
              <CtaButton size="lg" />
            </div>
          </div>
          <ol className="space-y-4">
            {channels.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background text-sm font-medium text-foreground">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-foreground sm:text-base">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex justify-center lg:hidden">
          <CtaButton size="lg" />
        </div>
      </div>
    </Section>
  )
}
