"use client"

import { useEffect, useRef } from "react"
import type { HeroImageSources } from "@/lib/constants"
import { getHeroImageSources } from "@/lib/hero-images"
import { subscribeScroll } from "@/lib/scroll-manager"
import { cn } from "@/lib/utils"

const MAX_BACKGROUND_BLUR_PX = 32
const BLUR_EASE_POWER = 0.68
const MAX_BACKGROUND_ZOOM = 1.45

function getTransformOrigin(position: string) {
  if (position.includes("100%")) return "50% 100%"

  return "50% 50%"
}

interface SectionSurfaceProps {
  children: React.ReactNode
  className?: string
  backgroundImages?: {
    desktop: HeroImageSources
    mobile?: HeroImageSources
  }
  backgroundImageScale?: number
  backgroundImagePosition?: string
  stackIndex?: number
  isLastInStack?: boolean
}

export function SectionSurface({
  children,
  className,
  backgroundImages,
  backgroundImageScale = 1,
  backgroundImagePosition = "center",
  stackIndex,
  isLastInStack,
}: SectionSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const baselineScrollYRef = useRef<number | null>(null)
  const activeBackgroundUrlRef = useRef("")

  useEffect(() => {
    if (!backgroundImages) return

    const images = backgroundImages

    function applyBackgroundImage() {
      const background = backgroundRef.current
      if (!background) return

      const sources = getHeroImageSources(images.desktop, images.mobile)
      const nextUrl = sources.webp

      if (activeBackgroundUrlRef.current === nextUrl) return

      activeBackgroundUrlRef.current = nextUrl
      background.style.backgroundImage = `url("${nextUrl}")`
    }

    function updateBackgroundEffects() {
      const surface = surfaceRef.current
      const background = backgroundRef.current
      if (!surface || !background) return

      if (baselineScrollYRef.current === null) {
        baselineScrollYRef.current = window.scrollY
      }

      const rect = surface.getBoundingClientRect()
      const scrollRange = rect.height + window.innerHeight * 0.55
      const scrolled = window.scrollY - baselineScrollYRef.current
      const progress = Math.min(1, Math.max(0, scrolled / scrollRange))
      const easedProgress = Math.pow(progress, BLUR_EASE_POWER)
      const blurPx = MAX_BACKGROUND_BLUR_PX * easedProgress
      const zoom = 1 + (MAX_BACKGROUND_ZOOM - 1) * easedProgress

      background.style.transform = `scale(${zoom})`
      background.style.filter = blurPx > 0 ? `blur(${blurPx}px)` : "none"
    }

    function handleResize() {
      baselineScrollYRef.current = null
      activeBackgroundUrlRef.current = ""
      applyBackgroundImage()
      updateBackgroundEffects()
    }

    applyBackgroundImage()
    updateBackgroundEffects()

    const unsubscribeScroll = subscribeScroll(updateBackgroundEffects)
    window.addEventListener("resize", handleResize)

    const mobileQuery = window.matchMedia("(max-width: 576px)")
    mobileQuery.addEventListener("change", applyBackgroundImage)

    return () => {
      unsubscribeScroll()
      window.removeEventListener("resize", handleResize)
      mobileQuery.removeEventListener("change", applyBackgroundImage)
      baselineScrollYRef.current = null
    }
  }, [backgroundImages])

  const isStacked = stackIndex !== undefined
  const initialBackgroundUrl = backgroundImages?.desktop.webp

  return (
    <div
      ref={surfaceRef}
      className={cn(
        "relative mx-[4px] overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24",
        isStacked
          ? isLastInStack
            ? "rounded-3xl"
            : "rounded-t-3xl rounded-b-none"
          : "rounded-3xl",
        isStacked && stackIndex > 0 && "-mt-6",
        className,
      )}
      style={isStacked ? { zIndex: 10 + stackIndex } : undefined}
    >
      {backgroundImages && (
        <div
          ref={backgroundRef}
          aria-hidden
          className="pointer-events-none absolute -inset-[18%] bg-no-repeat opacity-[0.85] will-change-[filter,transform]"
          style={{
            backgroundImage: initialBackgroundUrl
              ? `url("${initialBackgroundUrl}")`
              : undefined,
            backgroundSize: `${backgroundImageScale * 100}%`,
            backgroundPosition: backgroundImagePosition,
            transformOrigin: getTransformOrigin(backgroundImagePosition),
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
