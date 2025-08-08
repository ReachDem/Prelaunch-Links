import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path') || '/';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    // Lancer Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Configuration de la taille d'écran (1080p = 1920x1080)
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Configuration des headers pour simuler un navigateur réel
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    // Naviguer vers la page
    const targetUrl = `${baseUrl}${path}`;
    await page.goto(targetUrl, {
      waitUntil: 'networkidle0', // Attendre que toutes les ressources soient chargées
      timeout: 30000
    });

    // Attendre un délai supplémentaire pour les animations/lazy loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Prendre la capture d'écran
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false, // Capturer seulement le viewport (1920x1080)
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1080
      }
    });

    await browser.close();

    // Retourner l'image avec les bons headers
    return new NextResponse(Buffer.from(screenshot), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400', // Cache 1h navigateur, 24h CDN
        'Content-Length': screenshot.length.toString(),
      },
    });

  } catch (error) {
    console.error('Erreur lors de la capture d\'écran:', error);
    
    return NextResponse.json(
      { error: 'Impossible de générer la capture d\'écran' },
      { status: 500 }
    );
  }
}
