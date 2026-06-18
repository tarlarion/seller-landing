import { copyFile, mkdir, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const rootDir = path.resolve(import.meta.dirname, "..")
const sourcePath = path.join(rootDir, "src/assets/heropicture.png")
const outputDir = path.join(rootDir, "public")
const fontsDir = path.join(outputDir, "fonts")
const geistFilesDir = path.join(
  rootDir,
  "node_modules/@fontsource-variable/geist/files",
)

const imageVariants = [
  {
    name: "heropicture.avif",
    width: 1400,
    format: "avif",
    quality: 55,
  },
  {
    name: "heropicture.webp",
    width: 1400,
    format: "webp",
    quality: 82,
  },
  {
    name: "heropicture-mobile.avif",
    width: 800,
    format: "avif",
    quality: 52,
  },
  {
    name: "heropicture-mobile.webp",
    width: 800,
    format: "webp",
    quality: 80,
  },
]

const fontVariants = [
  {
    source: "geist-cyrillic-wght-normal.woff2",
    target: "geist-cyrillic.woff2",
  },
  {
    source: "geist-latin-wght-normal.woff2",
    target: "geist-latin.woff2",
  },
]

async function writeImageVariant(sourceStat, variant) {
  const outputPath = path.join(outputDir, variant.name)
  const outputStat = await stat(outputPath).catch(() => null)

  if (outputStat && outputStat.mtimeMs >= sourceStat.mtimeMs) {
    console.log(`[optimize-images] Up to date: ${variant.name}`)
    return
  }

  let pipeline = sharp(sourcePath)
    .rotate()
    .resize({ width: variant.width, withoutEnlargement: true })

  if (variant.format === "avif") {
    pipeline = pipeline.avif({ quality: variant.quality, effort: 4 })
  } else {
    pipeline = pipeline.webp({ quality: variant.quality, effort: 4 })
  }

  await pipeline.toFile(outputPath)

  const { size } = await stat(outputPath)
  console.log(
    `[optimize-images] Wrote ${variant.name} (${Math.round(size / 1024)} KB)`,
  )
}

async function copyFonts() {
  await mkdir(fontsDir, { recursive: true })

  for (const font of fontVariants) {
    const sourceFontPath = path.join(geistFilesDir, font.source)
    const targetFontPath = path.join(fontsDir, font.target)

    try {
      await copyFile(sourceFontPath, targetFontPath)
      const { size } = await stat(targetFontPath)
      console.log(
        `[optimize-images] Copied ${font.target} (${Math.round(size / 1024)} KB)`,
      )
    } catch (error) {
      console.warn(`[optimize-images] Font copy skipped: ${font.source}`, error)
    }
  }
}

async function optimizeImages() {
  await mkdir(outputDir, { recursive: true })

  let sourceStat
  try {
    sourceStat = await stat(sourcePath)
  } catch {
    console.warn("[optimize-images] Source not found, skipping:", sourcePath)
    await copyFonts()
    return
  }

  for (const variant of imageVariants) {
    await writeImageVariant(sourceStat, variant)
  }

  await copyFonts()
}

optimizeImages().catch((error) => {
  console.error("[optimize-images] Failed:", error)
  process.exit(1)
})
