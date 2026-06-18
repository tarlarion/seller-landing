import { ProductPrice } from "@/components/landing/product-price"
import { SectionSurface } from "@/components/landing/section-surface"
import { landingContent } from "@/content/landing"

export function SiteFooter() {
  return (
    <footer>
      <SectionSurface className="bg-neutral-50 py-8 sm:py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">{landingContent.brand}</p>
          <ProductPrice size="sm" />
        </div>
      </SectionSurface>
    </footer>
  )
}
