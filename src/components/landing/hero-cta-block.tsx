"use client"

import { useEffect, useRef } from "react"
import { CtaButton } from "@/components/landing/cta-button"
import { ProductPrice } from "@/components/landing/product-price"
import { getScrollY, subscribeScroll } from "@/lib/scroll-manager"

const ANIMATION_RANGE_PX = 120
const MAX_SCALE = 1.07

function easeOutBack(progress: number) {
  const c1 = 1.70158
  const c3 = c1 + 1

  return 1 + c3 * Math.pow(progress - 1, 3) + c1 * Math.pow(progress - 1, 2)
}

function getScaleFromProgress(progress: number) {
  return 1 + (MAX_SCALE - 1) * easeOutBack(Math.min(1, Math.max(0, progress)))
}

function getHeroCtaScale(scrollY: number, isEngaged: boolean) {
  if (scrollY <= 0) return { scale: 1, isEngaged: false }

  const progress = scrollY / ANIMATION_RANGE_PX

  if (scrollY >= ANIMATION_RANGE_PX) {
    return { scale: MAX_SCALE, isEngaged: true }
  }

  if (isEngaged) {
    return { scale: getScaleFromProgress(progress), isEngaged: true }
  }

  return { scale: getScaleFromProgress(progress), isEngaged: false }
}

export function HeroCtaBlock() {
  const blockRef = useRef<HTMLDivElement>(null)
  const isEngagedRef = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (mediaQuery.matches) return

    function updateScale() {
      const block = blockRef.current
      if (!block) return

      const scrollY = getScrollY()
      const next = getHeroCtaScale(scrollY, isEngagedRef.current)
      isEngagedRef.current = next.isEngaged

      block.style.transform = `scale(${next.scale})`
    }

    return subscribeScroll(updateScale)
  }, [])

  return (
    <div
      id="hero-cta"
      ref={blockRef}
      className="mt-10 flex origin-center flex-col items-center gap-3 sm:mt-12"
      style={{ transform: "scale(1)" }}
    >
      <ProductPrice className="items-center" />
      <CtaButton size="xl" />
    </div>
  )
}
