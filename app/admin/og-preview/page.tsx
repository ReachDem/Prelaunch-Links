'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function OGPreview() {
  const [path, setPath] = useState('/')
  const [isLoading, setIsLoading] = useState(false)
  const [lastGenerated, setLastGenerated] = useState<string>('')

  const generatePreview = async () => {
    setIsLoading(true)
    const timestamp = Date.now()
    const imageUrl = `/api/og-screenshot?path=${encodeURIComponent(path)}&t=${timestamp}`
    setLastGenerated(imageUrl)
    setIsLoading(false)
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
              disabled={isLoading}
            >
              {isLoading ? 'Génération...' : 'Générer'}
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
                <p><strong>Taille:</strong> 1920x1080 px</p>
                <p><strong>Format:</strong> PNG</p>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Comment utiliser :</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Entrez le chemin de la page (ex: <code>/about</code>, <code>/contact</code>)</li>
              <li>Cliquez sur "Générer" pour créer la capture d'écran</li>
              <li>L'image sera automatiquement utilisée pour les partages sociaux</li>
              <li>Le cache est de 1h pour les navigateurs, 24h pour les CDN</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
