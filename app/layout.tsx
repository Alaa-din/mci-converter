import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Calculateur MCI - Moteurs à Combustion Interne',
  description: 'Calculateur et convertisseur pour moteurs à combustion interne : puissance, couple, pression, rendements, consommation. Outil pédagogique pour ingénieurs et étudiants.',
  keywords: ['MCI', 'moteur', 'combustion interne', 'calculateur', 'ingénierie', 'automobile', 'thermodynamique'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
