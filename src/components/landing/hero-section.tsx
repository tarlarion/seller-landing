import { HERO_IMAGES } from "@/lib/constants"
import { HeroCtaBlock } from "@/components/landing/hero-cta-block"
import { PainCards } from "@/components/landing/pain-cards"
import { PainRotator } from "@/components/landing/pain-rotator"
import { Section, type SectionStackProps } from "@/components/landing/section"
import { landingContent } from "@/content/landing"

export function HeroSection({ stackIndex, isLastInStack }: SectionStackProps) {
  const { hero } = landingContent

  return (
    <Section
      stackIndex={stackIndex}
      isLastInStack={isLastInStack}
      backgroundImages={HERO_IMAGES}
      backgroundImageScale={0.5}
      backgroundImagePosition="center calc(100% + 10rem)"
      className="pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
          {hero.title.before}{" "}
          <span className="whitespace-nowrap">{hero.title.nowrap}</span>{" "}
          {hero.title.after}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
          {hero.subtitle}
        </p>
        <HeroCtaBlock />
      </div>

      <PainRotator />
      <PainCards />
    </Section>
  )
}
