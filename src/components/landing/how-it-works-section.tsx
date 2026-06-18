import cardImage from "@/assets/card.jpg"
import priceImage from "@/assets/price.jpg"
import { HowItWorksStepCard } from "@/components/landing/how-it-works-step-card"
import { Section, type SectionStackProps } from "@/components/landing/section"
import { landingContent } from "@/content/landing"
import { cn } from "@/lib/utils"

function getStepCardRadius(index: number, total: number) {
  const isFirst = index === 0
  const isLast = index === total - 1

  return cn(
    isFirst && "rounded-t-[12px] min-[977px]:rounded-none",
    isLast && "rounded-b-[12px] min-[977px]:rounded-none",
    !isFirst && !isLast && "rounded-none",
    index === 0 && "min-[977px]:rounded-tl-[12px] min-[977px]:rounded-tr-none min-[977px]:rounded-bl-none min-[977px]:rounded-br-none",
    index === 1 && "min-[977px]:rounded-tr-[12px] min-[977px]:rounded-tl-none min-[977px]:rounded-bl-none min-[977px]:rounded-br-none",
    index === 2 && "min-[977px]:rounded-bl-[12px] min-[977px]:rounded-tl-none min-[977px]:rounded-tr-none min-[977px]:rounded-br-none",
    index === 3 && "min-[977px]:rounded-br-[12px] min-[977px]:rounded-tl-none min-[977px]:rounded-tr-none min-[977px]:rounded-bl-none",
  )
}

const stepImageLayout = {
  width: 573,
  height: 1280,
  cropTopPx: 64,
  cropBottomPx: 80,
} as const

const stepBackgroundImages: Record<
  number,
  { src: string; alt: string; width: number; height: number; cropTopPx: number; cropBottomPx: number }
> = {
  1: {
    src: cardImage,
    alt: "Пример карточки товара, собранной ботом",
    ...stepImageLayout,
  },
  2: {
    src: priceImage,
    alt: "Экран настройки цены и деталей товара в боте",
    ...stepImageLayout,
  },
}

export function HowItWorksSection({ stackIndex, isLastInStack }: SectionStackProps) {
  return (
    <Section
      id="how-it-works"
      stackIndex={stackIndex}
      isLastInStack={isLastInStack}
      className="bg-brand-iron-dark"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Как работает бот
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          От ссылки клиента до готовой карточки — за несколько секунд
        </p>
      </div>

      <ol className="mt-12 grid gap-px min-[977px]:grid-cols-2">
        {landingContent.steps.map((step, index) => (
          <HowItWorksStepCard
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            hasVideoBackground={index === 0}
            backgroundImage={stepBackgroundImages[index]}
            showShareIcon={index === 3}
            className={getStepCardRadius(index, landingContent.steps.length)}
          />
        ))}
      </ol>
    </Section>
  )
}
