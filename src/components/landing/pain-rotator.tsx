"use client"

import { useEffect, useState } from "react"
import { landingContent } from "@/content/landing"
import { cn } from "@/lib/utils"

const painTexts = landingContent.pains.map((pain) => pain.before)

const ENTER_MS = 450
const VISIBLE_MS = 900
const STRIKE_MS = 400
const STRIKE_LINE_MS = 320
const HOLD_MS = 700
const EXIT_MS = 350

type Phase = "enter" | "visible" | "strike" | "hold" | "exit"

function getNextStep(index: number, phase: Phase): { index: number; phase: Phase } {
  if (phase === "enter") return { index, phase: "visible" }
  if (phase === "visible") return { index, phase: "strike" }
  if (phase === "strike") return { index, phase: "hold" }
  if (phase === "hold") return { index, phase: "exit" }

  return { index: (index + 1) % painTexts.length, phase: "enter" }
}

function getPhaseDelay(phase: Phase) {
  if (phase === "enter") return ENTER_MS
  if (phase === "visible") return VISIBLE_MS
  if (phase === "strike") return STRIKE_MS
  if (phase === "hold") return HOLD_MS

  return EXIT_MS
}

export function PainRotator() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("enter")
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    function handleChange() {
      setIsReducedMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (isReducedMotion) return

    let timeoutId = 0
    let cancelled = false
    let currentIndex = 0
    let currentPhase: Phase = "enter"

    function scheduleStep() {
      if (cancelled) return

      setIndex(currentIndex)
      setPhase(currentPhase)

      timeoutId = window.setTimeout(() => {
        const next = getNextStep(currentIndex, currentPhase)
        currentIndex = next.index
        currentPhase = next.phase
        scheduleStep()
      }, getPhaseDelay(currentPhase))
    }

    scheduleStep()

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [isReducedMotion])

  const text = painTexts[index]
  const isStruck =
    !isReducedMotion &&
    (phase === "strike" || phase === "hold" || phase === "exit")
  const isVisible =
    isReducedMotion || phase !== "enter" && phase !== "exit"

  return (
    <div
      className="mx-auto mt-14 min-h-[4.5rem] max-w-3xl text-center sm:mt-16 sm:min-h-[5rem]"
      aria-live="polite"
      aria-atomic="true"
    >
      <h2
        className={cn(
          "text-balance text-xl font-semibold leading-snug tracking-tight text-foreground transition-opacity duration-500 ease-out sm:text-2xl lg:text-3xl",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <span
          className={cn(
            "inline box-decoration-clone bg-no-repeat text-foreground",
            "[background-image:linear-gradient(rgb(239_68_68),rgb(239_68_68))]",
            "[background-position:0_58%]",
            "transition-[background-size] ease-out",
            isStruck ? "bg-[length:100%_2px]" : "bg-[length:0%_2px]",
          )}
          style={{
            transitionDuration: isReducedMotion ? "0ms" : `${STRIKE_LINE_MS}ms`,
          }}
        >
          {text}
        </span>
      </h2>
    </div>
  )
}
