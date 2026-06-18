import { benefitIcons } from "@/components/icons/benefit-icons"
import { Section, type SectionStackProps } from "@/components/landing/section"
import { landingContent } from "@/content/landing"
import { cn } from "@/lib/utils"

const benefitIconColors = [
  "text-primary",
  "text-brand-accent",
  "text-[#8A7FD4]",
  "text-[#5A9BAD]",
  "text-[#C97BA8]",
] as const

export function BenefitsSection({ stackIndex, isLastInStack }: SectionStackProps) {
  const { benefits } = landingContent

  return (
    <Section stackIndex={stackIndex} isLastInStack={isLastInStack}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {benefits.title}
        </h2>
        <p className="mt-3 text-base text-muted-foreground">{benefits.subtitle}</p>
      </div>
      <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {benefits.items.map((item, index) => {
          const Icon = benefitIcons[index]

          return (
            <li
              key={item}
              className="flex flex-col items-center rounded-2xl border border-neutral-200 px-4 py-8 text-center sm:px-6 sm:py-10"
            >
              <Icon className={cn("size-16", benefitIconColors[index])} />
              <span className="mt-4 text-sm text-foreground sm:text-base">
                {item}
              </span>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
