/** Замените на реальную ссылку бота перед продакшеном */
export const TELEGRAM_BOT_URL = "https://t.me/your_bot"

export interface HeroImageSources {
  avif: string
  webp: string
}

export const HERO_IMAGES = {
  desktop: {
    avif: "/heropicture.avif",
    webp: "/heropicture.webp",
  },
  mobile: {
    avif: "/heropicture-mobile.avif",
    webp: "/heropicture-mobile.webp",
  },
} satisfies Record<string, HeroImageSources>

/** @deprecated Use HERO_IMAGES instead */
export const HERO_PICTURE_URL = HERO_IMAGES.desktop.webp
/** @deprecated Use HERO_IMAGES instead */
export const HERO_PICTURE_MOBILE_URL = HERO_IMAGES.mobile.webp

export const PRICING = {
  oldPrice: 2599,
  newPrice: 990,
  period: "/мес",
} as const

export const DISCOUNT_AMOUNT = PRICING.oldPrice - PRICING.newPrice

export const DISCOUNT_PERCENT = Math.round(
  (DISCOUNT_AMOUNT / PRICING.oldPrice) * 100,
)

export function formatPrice(amount: number) {
  return `${amount.toLocaleString("ru-RU")} ₽`
}
