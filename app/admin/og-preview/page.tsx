'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function OGPreview() {
  const [isLocalhost, setIsLocalhost] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)
  const [path, setPath] = useState('/')
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastGenerated, setLastGenerated] = useState<string>('')

  useEffect(() => {
    // Vérifier si nous sommes en localhost
    const checkLocalhost = () => {
      const hostname = window.location.hostname
      const isLocal = hostname === 'localhost' || 
                     hostname === '127.0.0.1' || 
                     hostname.includes('localhost') ||
                     process.env.NODE_ENV === 'development'
      setIsLocalhost(isLocal)
      setIsCheckingAccess(false)
    }

    checkLocalhost()
  }, [])

  // Si nous ne sommes pas en localhost, afficher un message d'erreur
  if (isCheckingAccess) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p>Vérification de l'accès...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isLocalhost) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Accès Refusé</CardTitle>
            <CardDescription>
              Cette page n'est accessible qu'en environnement de développement local.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Pour des raisons de sécurité, cette page d'administration n'est disponible qu'en localhost.
              </p>
              <p className="text-sm text-muted-foreground">
                Si vous êtes un développeur, accédez à cette page via votre environnement de développement local.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const generatePreview = async () => {
    setIsGenerating(true)
    const timestamp = Date.now()
    const imageUrl = `/opengraph-image?t=${timestamp}`
    setLastGenerated(imageUrl)
    setIsGenerating(false)
  }

  const downloadImage = () => {
    if (lastGenerated) {
      const link = document.createElement('a')
      link.href = lastGenerated
      link.download = `og-image-${path.replace(/\//g, '-') || 'home'}.png`
      link.click()
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Prévisualisation Image Open Graph</CardTitle>
          <CardDescription>
            Générez et prévisualisez les images Open Graph pour vos pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="/chemin/vers/page"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={generatePreview} 
              disabled={isGenerating}
            >
              {isGenerating ? 'Génération...' : 'Générer'}
            </Button>
          </div>

          {lastGenerated && (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={lastGenerated}
                  alt="Aperçu Open Graph"
                  className="w-full h-auto"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={downloadImage}>
                  Télécharger l'image
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(lastGenerated)}
                >
                  Copier l'URL
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p><strong>URL de l'image:</strong> {lastGenerated}</p>
                <p><strong>Taille:</strong> 1200x630 px (format OG standard)</p>
                <p><strong>Format:</strong> PNG</p>
                <p><strong>Génération:</strong> Next.js ImageResponse (edge runtime)</p>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Comment utiliser :</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>L'image OG utilise directement votre composant Hero existant</li>
              <li>Cliquez sur "Générer" pour voir l'aperçu de l'image</li>
              <li>L'image est générée automatiquement par Next.js depuis /app/opengraph-image.tsx</li>
              <li>Le contenu reflète fidèlement votre section hero avec toutes les animations</li>
              <li>Format standard 1200x630px optimisé pour tous les réseaux sociaux</li>
            </ol>
            
            <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <p className="text-sm text-green-800">
                <strong>✨ Approche simplifiée :</strong> L'image OG utilise maintenant directement votre composant Hero - 
                plus simple, plus maintenable et toujours synchronisé avec votre design !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
