import { useEffect, useState } from "react"
import {
  BoltCircleIcon,
  DollarCircleIcon,
  LinkSquareIcon,
} from "@/components/icons/pain-card-icons"
import { landingContent } from "@/content/landing"
import { cn } from "@/lib/utils"

const REVEAL_DELAY_MS = 400
const STAGGER_MS = 120

const painIcons = [LinkSquareIcon, DollarCircleIcon, BoltCircleIcon] as const

export function PainCards() {
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (mediaQuery.matches) {
      setIsRevealed(true)
      return
    }

    let timeoutId = 0

    function scheduleReveal() {
      timeoutId = window.setTimeout(() => setIsRevealed(true), REVEAL_DELAY_MS)
    }

    if (document.readyState === "complete") scheduleReveal()
    else window.addEventListener("load", scheduleReveal, { once: true })

    return () => {
      window.removeEventListener("load", scheduleReveal)
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="mt-8 grid min-h-[11rem] gap-6 sm:mt-10 md:min-h-[9rem] md:grid-cols-3 md:gap-5">
      {landingContent.pains.map((pain, index) => {
        const Icon = painIcons[index]

        return (
        <article
          key={pain.after}
          className="min-h-[9.5rem] rounded-3xl bg-neutral-100 px-5 py-6 text-center sm:min-h-[10rem] sm:px-6 sm:py-8 md:min-h-[9rem]"
        >
          <div
            className={cn(
              "transition-opacity duration-700 ease-out",
              isRevealed ? "opacity-100" : "opacity-0",
            )}
            style={{
              transitionDelay: isRevealed ? `${index * STAGGER_MS}ms` : "0ms",
            }}
          >
            <div className="mx-auto mb-4 flex size-12 items-center justify-center text-foreground/80">
              <Icon />
            </div>
            <h2 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
              {pain.after}
            </h2>
          </div>
        </article>
        )
      })}
    </div>
  )
}
