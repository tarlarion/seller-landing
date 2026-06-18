import { AudienceSection } from "@/components/landing/audience-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { ChannelsSection } from "@/components/landing/channels-section"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { MetricsSection } from "@/components/landing/metrics-section"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"

export function LandingPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main className="max-sm:pb-24">
        <HeroSection stackIndex={0} />
        <HowItWorksSection stackIndex={1} />
        <MetricsSection stackIndex={2} />
        <AudienceSection stackIndex={3} />
        <BenefitsSection stackIndex={4} />
        <ComparisonSection stackIndex={5} />
        <ChannelsSection stackIndex={6} isLastInStack />
      </main>
      <SiteFooter />
    </div>
  )
}
