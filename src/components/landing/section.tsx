import { cn } from "@/lib/utils"
import type { HeroImageSources } from "@/lib/constants"
import { SectionSurface } from "@/components/landing/section-surface"

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
  backgroundImages?: {
    desktop: HeroImageSources
    mobile?: HeroImageSources
  }
  backgroundImageScale?: number
  backgroundImagePosition?: string
  stackIndex?: number
  isLastInStack?: boolean
}

export interface SectionStackProps {
  stackIndex: number
  isLastInStack?: boolean
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  backgroundImages,
  backgroundImageScale,
  backgroundImagePosition,
  stackIndex,
  isLastInStack,
}: SectionProps) {
  return (
    <section id={id}>
      <SectionSurface
        className={className}
        backgroundImages={backgroundImages}
        backgroundImageScale={backgroundImageScale}
        backgroundImagePosition={backgroundImagePosition}
        stackIndex={stackIndex}
        isLastInStack={isLastInStack}
      >
        <div className={cn("mx-auto w-full max-w-6xl", containerClassName)}>
          {children}
        </div>
      </SectionSurface>
    </section>
  )
}
