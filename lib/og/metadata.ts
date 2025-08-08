import { Metadata } from 'next'

interface OGImageOptions {
  title: string
  description: string
  path?: string
  width?: number
  height?: number
}

export function generateOGMetadata(options: OGImageOptions): Metadata {
  const {
    title,
    description,
    path = '/',
    width = 1920,
    height = 1080
  } = options

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const ogImageUrl = `${baseUrl}/api/og-screenshot?path=${encodeURIComponent(path)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      url: `${baseUrl}${path}`,
      siteName: "RCDM Ink",
      images: [
        {
          url: ogImageUrl,
          width,
          height,
          alt: `Aperçu de ${title}`,
          type: "image/png",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export function getOGImageUrl(path: string = '/'): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return `${baseUrl}/api/og-screenshot?path=${encodeURIComponent(path)}`
}
