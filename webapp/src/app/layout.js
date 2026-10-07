import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://www.renova31.fr'),
  title: {
    default: 'RENOVA — Rénovation Intérieure Haut de Gamme à Toulouse',
    template: '%s | RENOVA'
  },
  description: 'Expert en jointure, plaquisterie, peinture et rénovation intérieure en Haute-Garonne. RENOVA — des chantiers propres et des finitions d\'exception.',
  keywords: ['rénovation intérieure', 'plaquiste Toulouse', 'artisan peintre', 'jointeur', 'chantier propre', 'RENOVA', 'aménagement intérieur'],
  openGraph: {
    title: 'RENOVA — Rénovation Intérieure Haut de Gamme',
    description: 'Expert en jointure, plaquisterie et peinture à Toulouse.',
    url: 'https://www.renova31.fr',
    siteName: 'RENOVA',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17945087880" strategy="afterInteractive" />
        <Script 
          id="google-analytics" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17945087880');
            `
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
