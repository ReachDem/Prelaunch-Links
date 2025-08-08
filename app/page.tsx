import { Hero } from '@/components/hero'
import { generateOGMetadata } from '@/lib/og/metadata'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
  return generateOGMetadata({
    title: "RCDM Ink - Page d'accueil",
    description: "Découvrez RCDM Ink - Solution innovante en prélancement. Rejoignez-nous dès maintenant !",
    path: "/",
  })
}

export default function Home() {
  return (
    <main className="px-4 md:px-0 mx-auto items-center">
      <Hero />
    </main>
  )
}
