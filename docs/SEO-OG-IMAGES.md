# SEO - Images Open Graph Dynamiques

## Vue d'ensemble

Cette implémentation permet de générer automatiquement des captures d'écran 1080p (1920x1080) de vos pages pour les utiliser comme images Open Graph. Les images sont générées dynamiquement lors du premier accès et mises en cache.

## Fonctionnalités

✅ **Capture d'écran automatique** - Génération en temps réel des images OG  
✅ **Format optimisé** - 1920x1080px pour une qualité parfaite  
✅ **Cache intelligent** - 1h navigateur, 24h CDN  
✅ **Interface d'administration** - Prévisualisation et test des images  
✅ **Métadonnées complètes** - Open Graph + Twitter Cards  

## Endpoints disponibles

### `/api/og-screenshot`
Génère une capture d'écran de la page spécifiée.

**Paramètres:**
- `path` (optionnel) - Chemin de la page à capturer (défaut: `/`)

**Exemples:**
```
/api/og-screenshot?path=/
/api/og-screenshot?path=/about
/api/og-screenshot?path=/contact
```

### `/admin/og-preview`
Interface d'administration pour prévisualiser et tester les images OG.

## Utilisation dans le code

### Métadonnées automatiques
```tsx
// app/ma-page/page.tsx
import { generateOGMetadata } from '@/lib/og/metadata'

export async function generateMetadata() {
  return generateOGMetadata({
    title: "Titre de ma page",
    description: "Description de ma page",
    path: "/ma-page",
  })
}
```

### URL d'image OG directe
```tsx
import { getOGImageUrl } from '@/lib/og/metadata'

const imageUrl = getOGImageUrl('/ma-page')
```

## Configuration

### Variables d'environnement
```env
NEXT_PUBLIC_BASE_URL="http://localhost:3000"  # URL de base de votre site
```

### Cache et performance
- **Cache navigateur:** 1 heure
- **Cache CDN:** 24 heures
- **Timeout génération:** 30 secondes
- **Délai animations:** 2 secondes

## Optimisations

### Puppeteer
- Mode headless activé
- Viewport fixe 1920x1080
- Désactivation GPU pour la performance
- User-agent réaliste pour éviter les blocages

### Qualité image
- Format PNG pour la transparence
- Capture viewport uniquement (pas de scroll)
- Attente du chargement complet (`networkidle0`)

## Déploiement

### Vercel (recommandé)
```bash
pnpm build
vercel --prod
```

### Docker
Assurez-vous d'inclure les dépendances Puppeteer dans votre Dockerfile :
```dockerfile
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    # ... autres dépendances Puppeteer
```

## Test et débuggage

1. **Accédez à l'interface d'admin:** `http://localhost:3000/admin/og-preview`
2. **Testez différents chemins** 
3. **Vérifiez les métadonnées** avec l'inspecteur Facebook/Twitter
4. **Surveillez les logs** pour les erreurs de génération

## URLs de test

- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Inspector: https://www.linkedin.com/post-inspector/

## Limitations

- **Timeout:** 30 secondes maximum par génération
- **Mémoire:** Usage intensif, prévoir scaling en production
- **JavaScript:** Nécessite JS activé sur les pages à capturer
- **Fonts:** Assurer le chargement des polices avant capture

## Dépannage

### Erreur "Page ne répond pas"
- Vérifiez que le serveur est accessible
- Augmentez le timeout si nécessaire
- Vérifiez les logs Puppeteer

### Image vide ou incorrecte
- Vérifiez le délai d'attente (2s par défaut)
- Testez en mode non-headless pour débugger
- Vérifiez le viewport et les CSS responsive

### Problèmes de performance
- Implémentez un système de queue
- Utilisez un cache Redis
- Pré-générez les images importantes
