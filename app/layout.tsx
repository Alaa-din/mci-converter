import type { Metadata } from 'next'
import './globals.css'

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
