"use client"

import { useCallback, useEffect, useRef } from "react"
import { Share2 } from "lucide-react"
import howItWorksVideo from "@/assets/video/howitworks.mp4"
import { cn } from "@/lib/utils"

const stepVideoClassName = cn(
  "pointer-events-none max-h-full w-[54%] max-w-[11.5rem] overflow-hidden rounded-[12px] object-contain object-bottom",
  "sm:w-[58%] sm:max-w-[12.5rem]",
  "lg:w-[64%] lg:max-w-[15rem]",
)

const stepImageClassName = cn(
  "pointer-events-none max-h-full w-[50%] max-w-[10.5rem] overflow-hidden rounded-[12px] object-contain object-bottom",
  "sm:w-[54%] sm:max-w-[12rem]",
  "lg:w-[58%] lg:max-w-[14rem]",
)

const stepIconClassName = cn(
  "pointer-events-none text-foreground",
  "size-20 sm:size-24 lg:size-28",
)

interface StepBackgroundImage {
  src: string
  alt: string
  width: number
  height: number
  cropTopPx?: number
  cropBottomPx?: number
}

interface HowItWorksStepCardProps {
  step: string
  title: string
  description: string
  className?: string
  hasVideoBackground?: boolean
  backgroundImage?: StepBackgroundImage
  showShareIcon?: boolean
}

function getImageClipClassName(image: StepBackgroundImage) {
  if (!image.cropTopPx && !image.cropBottomPx) return ""

  const top = image.cropTopPx ?? 0
  const bottom = image.cropBottomPx ?? 0

  return `[clip-path:inset(${top}px_0_${bottom}px_0_round_12px)]`
}

function canUseHoverPlayback() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

async function playWhenReady(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    await new Promise<void>((resolve) => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        resolve()
        return
      }

      video.addEventListener("canplay", () => resolve(), { once: true })
    })
  }

  await video.play()
}

export function HowItWorksStepCard({
  step,
  title,
  description,
  className,
  hasVideoBackground = false,
  backgroundImage,
  showShareIcon = false,
}: HowItWorksStepCardProps) {
  const cardRef = useRef<HTMLLIElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isHoveringRef = useRef(false)
  const isVisibleEnoughRef = useRef(false)
  const hasMedia = hasVideoBackground || Boolean(backgroundImage) || showShareIcon

  const updatePlayback = useCallback(async () => {
    const video = videoRef.current
    if (!video) return

    const shouldPlay = canUseHoverPlayback()
      ? isHoveringRef.current
      : isVisibleEnoughRef.current

    if (!shouldPlay) {
      video.pause()
      return
    }

    try {
      await playWhenReady(video)
    } catch {
      // Autoplay blocked or interrupted
    }
  }, [])

  useEffect(() => {
    if (!hasVideoBackground) return

    const card = cardRef.current
    const video = videoRef.current
    if (!card || !video) return

    video.muted = true
    video.defaultMuted = true

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotionQuery.matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleEnoughRef.current =
          entry.isIntersecting && entry.intersectionRatio >= 0.5

        if (!canUseHoverPlayback()) {
          void updatePlayback()
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    observer.observe(card)

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    function handleHoverCapabilityChange() {
      isHoveringRef.current = false
      void updatePlayback()
    }

    hoverQuery.addEventListener("change", handleHoverCapabilityChange)

    return () => {
      observer.disconnect()
      hoverQuery.removeEventListener("change", handleHoverCapabilityChange)
    }
  }, [hasVideoBackground, updatePlayback])

  function handlePointerEnter() {
    if (!canUseHoverPlayback()) return

    isHoveringRef.current = true
    void updatePlayback()
  }

  function handlePointerLeave() {
    if (!canUseHoverPlayback()) return

    isHoveringRef.current = false
    void updatePlayback()
  }

  return (
    <li
      ref={cardRef}
      onPointerEnter={hasVideoBackground ? handlePointerEnter : undefined}
      onPointerLeave={hasVideoBackground ? handlePointerLeave : undefined}
      className={cn(
        "relative flex flex-col overflow-hidden bg-white p-6",
        hasMedia ? "min-h-[24rem] aspect-square" : "aspect-square",
        className,
      )}
    >
      <div className="relative shrink-0 max-w-[92%] sm:max-w-[88%] lg:max-w-[85%]">
        <span className="text-xs font-medium tabular-nums text-muted-foreground">
          {step}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {hasMedia && (
        <div
          className={cn(
            "relative mt-auto flex min-h-0 flex-1 justify-center pt-3 sm:pt-4",
            showShareIcon && !hasVideoBackground && !backgroundImage
              ? "items-center"
              : "items-end",
          )}
        >
          {hasVideoBackground && (
            <video
              ref={videoRef}
              src={howItWorksVideo}
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className={stepVideoClassName}
              aria-hidden
            />
          )}

          {backgroundImage && (
            <img
              src={backgroundImage.src}
              alt={backgroundImage.alt}
              width={backgroundImage.width}
              height={backgroundImage.height}
              className={cn(stepImageClassName, getImageClipClassName(backgroundImage))}
            />
          )}

          {showShareIcon && (
            <Share2
              className={stepIconClassName}
              strokeWidth={1.75}
              aria-hidden
            />
          )}
        </div>
      )}
    </li>
  )
}
