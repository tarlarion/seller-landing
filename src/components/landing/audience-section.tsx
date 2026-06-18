import imgCases from "@/assets/img-cases.png"
import { Section, type SectionStackProps } from "@/components/landing/section"
import { landingContent } from "@/content/landing"

export function AudienceSection({ stackIndex, isLastInStack }: SectionStackProps) {
  const { audience } = landingContent

  return (
    <Section stackIndex={stackIndex} isLastInStack={isLastInStack}>
      <div className="rounded-2xl bg-gradient-to-br from-brand-iron-dark via-accent to-muted px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {audience.title}
          </h2>
        </div>

        <img
          src={imgCases}
          alt="Примеры закупок: китайские площадки, магазины Европы и США, Telegram-канал"
          width={1280}
          height={832}
          loading="lazy"
          className="mx-auto mt-8 w-1/2"
        />

        <ul className="mx-auto mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {audience.items.map((item) => (
            <li key={item.title} className="flex flex-col items-start">
              <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
