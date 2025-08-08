import { Hero } from '@/components/hero'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'RCDM Ink – Ne racourcissez pas juste, optimisez vos liens.'
  const description = 'Créez, mesurez et optimisez vos liens intelligemment tout en respectant la vie privée.'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website'
      // L image OG est automatiquement fournie par opengraph-image.ts
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
      // L image Twitter peut réutiliser la même (Next la réutilise si pas précisé)
    }
  }
}

export default function Home() {
  return (
    <main className="px-4 md:px-0 mx-auto items-center">
      <Hero />
    </main>
  )
}
