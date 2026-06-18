import type { HeroImageSources } from "@/lib/constants"

export function buildBackgroundImageSet({ avif, webp }: HeroImageSources) {
  return `image-set(url("${avif}") type("image/avif"), url("${webp}") type("image/webp"))`
}

export function getHeroImageSources(
  desktop: HeroImageSources,
  mobile?: HeroImageSources,
) {
  const isMobile = window.matchMedia("(max-width: 576px)").matches

  return isMobile && mobile ? mobile : desktop
}
