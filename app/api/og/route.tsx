import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
 
export const runtime = 'edge'
 
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Paramètres de l'image
    const title = searchParams.get('title') || 'RCDM Ink'
    const description = searchParams.get('description') || 'Votre partenaire digital'
    const path = searchParams.get('path') || '/'
    
    // Définir le contenu en fonction du path
    const getPageContent = (path: string) => {
      switch (path) {
        case '/':
          return {
            badge: 'Des liens qui comprennent',
            title: 'Ne racourcissez pas juste, Optimisez vos liens.',
            description: 'Creez, mesurez, et optimisez vos liens de maniere intelligente. Utilisez un raccourcisseur qui apprends de vos utilisateurs tout en respectant leur vie privée.',
            isHero: true
          }
        case '/about':
          return {
            title: 'À propos',
            subtitle: 'RCDM Ink',
            description: 'Découvrez notre histoire et notre mission',
            isHero: false
          }
        case '/contact':
          return {
            title: 'Contact',
            subtitle: 'RCDM Ink', 
            description: 'Parlons de votre projet ensemble',
            isHero: false
          }
        case '/casestudies':
          return {
            title: 'Études de cas',
            subtitle: 'RCDM Ink',
            description: 'Découvrez nos réalisations et succès clients',
            isHero: false
          }
        default:
          return {
            title: title || 'RCDM Ink',
            subtitle: 'RCDM Ink',
            description: description || 'Solutions digitales innovantes',
            isHero: false
          }
      }
    }
    
    const content = getPageContent(path)

    // Layout Hero pour la page d'accueil
    if (content.isHero) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000',
              backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
              backgroundSize: '100px 100px',
              padding: '80px 60px',
              position: 'relative',
            }}
          >
            {/* Badge en haut */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                padding: '12px 24px',
                marginBottom: '40px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  marginRight: '12px',
                }}
              />
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '500',
                }}
              >
                {content.badge}
              </span>
            </div>

            {/* Titre principal stylé comme dans Hero */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '32px',
                maxWidth: '900px',
              }}
            >
              <h1
                style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  lineHeight: 1.1,
                  margin: 0,
                  color: '#ffffff',
                }}
              >
                <span style={{ color: '#9ca3af' }}>
                  Ne{' '}
                  <span style={{ fontWeight: '300', color: '#fb923c' }}>
                    racourcissez
                  </span>{' '}
                  pas juste,
                </span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Optimisez
                </span>{' '}
                <span
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'underline',
                    textDecorationColor: '#60a5fa',
                  }}
                >
                  vos liens
                </span>
                <span style={{ color: '#ffffff' }}>.</span>
              </h1>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '20px',
                color: '#9ca3af',
                textAlign: 'center',
                lineHeight: 1.6,
                maxWidth: '600px',
                margin: 0,
              }}
            >
              {content.description}
            </p>

            {/* Éléments décoratifs */}
            <div
              style={{
                position: 'absolute',
                top: '60px',
                right: '60px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.3), rgba(96, 165, 250, 0.3))',
                filter: 'blur(60px)',
              }}
            />
            
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                left: '60px',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(251, 146, 60, 0.3))',
                filter: 'blur(40px)',
              }}
            />
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    // Layout standard pour les autres pages
 
    return new ImageResponse(
      (
    // Layout standard pour les autres pages
 
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            position: 'relative',
          }}
        >
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            }}
          />
          
          {/* Logo/Brand area */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '60px',
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              {content.subtitle || 'RCDM Ink'}
            </div>
          </div>
          
          {/* Main title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: '30px',
              maxWidth: '900px',
              zIndex: 10,
            }}
          >
            {content.title}
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.4,
              zIndex: 10,
            }}
          >
            {content.description}
          </div>
          
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              right: '50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
              filter: 'blur(60px)',
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '50px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
              filter: 'blur(40px)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
