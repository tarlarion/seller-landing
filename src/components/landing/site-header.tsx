"use client"

import { useEffect, useRef, useState } from "react"
import { CtaButton } from "@/components/landing/cta-button"
import { landingContent } from "@/content/landing"
import { getScrollY, subscribeScroll } from "@/lib/scroll-manager"
import { cn } from "@/lib/utils"

const HERO_CTA_ID = "hero-cta"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(true)

  const lastScrolledRef = useRef(false)

  useEffect(() => {
    return subscribeScroll(() => {
      const isScrolled = getScrollY() > 8
      if (isScrolled === lastScrolledRef.current) return

      lastScrolledRef.current = isScrolled
      setIsScrolled(isScrolled)
    })
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let retryId = 0

    function setupObserver() {
      const target = document.getElementById(HERO_CTA_ID)
      if (!target) {
        retryId = window.requestAnimationFrame(setupObserver)
        return
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsHeroCtaVisible(entry.isIntersecting)
        },
        { threshold: 0 },
      )
      observer.observe(target)
    }

    setupObserver()

    return () => {
      window.cancelAnimationFrame(retryId)
      observer?.disconnect()
    }
  }, [])

  const showHeaderCta = !isHeroCtaVisible
  const showMobileBottomCta = isScrolled && showHeaderCta

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 ease-out",
          isScrolled && "max-sm:hidden sm:flex sm:justify-center sm:px-4 sm:pt-3",
        )}
      >
        <div
          className={cn(
            "flex items-center transition-all duration-300 ease-out",
            isScrolled
              ? cn(
                  "relative h-[4.5rem] w-[min(92vw,33%)] min-w-[9.5rem] rounded-full border border-white/60 bg-gradient-to-b from-white/95 via-white/82 to-white/68 px-5 shadow-[0_6px_28px_-8px_rgba(0,0,0,0.1),0_2px_10px_-4px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl",
                  showHeaderCta ? "justify-center" : "justify-start",
                )
              : "mx-auto h-14 w-full max-w-6xl justify-start px-5 sm:h-16 sm:px-6 lg:px-8",
          )}
        >
          <a
            href="#"
            className={cn(
              "shrink-0 text-sm font-semibold tracking-tight text-foreground transition-all duration-300 sm:text-base",
              isScrolled && showHeaderCta && "absolute left-5 top-1/2 -translate-y-1/2",
            )}
          >
            {landingContent.brand}
          </a>

          {showHeaderCta && isScrolled && (
            <CtaButton
              size="default"
              className="shrink-0 px-4 py-2.5 text-xs shadow-md transition-all duration-300 ease-out [&_svg]:size-3.5"
            />
          )}
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-300 ease-out sm:hidden",
          showMobileBottomCta
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <CtaButton size="xl" className="w-full max-w-sm justify-center shadow-lg" />
      </div>
    </>
  )
}
