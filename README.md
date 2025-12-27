# Calculateur MCI - Moteurs à Combustion Interne

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Calculateur professionnel et outil pédagogique pour l'ingénierie des moteurs à combustion interne. Développé avec Next.js 15, React 19 et TypeScript.

## Fonctionnalités

### Calculateurs Professionnels

- **PME/PMI** : Pressions moyennes effective et indiquée
- **Puissance** : Pe (effective) et Pi (indiquée)
- **Couple** : Ce (effectif) et Ci (indiqué)
- **Rendements** : Mécanique, thermique indiqué, thermique effectif
- **Consommation** : Horaire (Co) et spécifique (Cs)

### Mode Étudiant

Activez le mode pédagogique pour afficher :

1. Formules mathématiques
2. Substitution avec vos valeurs
3. Calculs étape par étape
4. Résultat final
5. Interprétation physique

### Interface Interactive

- **Drag & Drop** : Glissez-déposez des préréglages dans les champs
- **Préréglages** : Valeurs typiques (citadine, sportive, essence, diesel)
- **Responsive** : Interface adaptée mobile, tablette et desktop
- **Design moderne** : Glassmorphisme et gradients sombres

### Convertisseur d'Unités

Convertisseur intégré pour :

- Puissance (W, kW, ch, hp)
- Couple (N·m, kg·m, lb·ft)
- Pression (Pa, kPa, bar, psi, atm)
- Température (°C, °F, K)
- Cylindrée (cm³, L, in³)
- Vitesse de rotation (rpm, rad/s, Hz)

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) v18+
- npm ou yarn

### Démarrage

```bash
git clone https://github.com/votre-username/mci-converter.git
cd mci-converter

npm install

npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

## Structure du Projet

```
mci-converter/
├── app/                    # Next.js App Router
│   ├── calculs/           # Pages de calcul
│   │   ├── pme/
│   │   ├── pmi/
│   │   ├── puissance/
│   │   ├── couple/
│   │   ├── rendement/
│   │   └── consommation/
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # Sitemap XML
├── components/            # Composants React
│   ├── CalculatorLayout.tsx
│   ├── DraggableInput.tsx
│   ├── PedagogicalSteps.tsx
│   └── UnitConverter.tsx
├── lib/                   # Bibliothèque de calculs
│   └── mci/
│       ├── pressures.ts   # PME, PMI, PMF
│       ├── powers.ts      # Pe, Pi
│       ├── torques.ts     # Ce, Ci
│       ├── efficiency.ts  # Rendements
│       ├── consumption.ts # Co, Cs
│       ├── constants.ts
│       ├── types.ts
│       └── index.ts
└── public/                # Assets statiques
```

## Formules Implémentées

### Pressions

| Formule | Description |
|---------|-------------|
| `PME = (Ce × τ × 4π) / Vd` | Pression Moyenne Effective |
| `PMI = (Ci × τ × 4π) / Vd` | Pression Moyenne Indiquée |
| `PMF = PMI - PME` | Pression de Frottement |

### Puissances et Couples

| Formule | Description |
|---------|-------------|
| `Pe = Ce × ω` | Puissance Effective |
| `Pi = Ci × ω` | Puissance Indiquée |
| `Ce = Pe / ω` | Couple Effectif |
| `Ci = Pi / ω` | Couple Indiqué |

### Rendements

| Formule | Description |
|---------|-------------|
| `ηm = Pe / Pi` | Rendement Mécanique |
| `ηthi = Pi / (ṁf × PCI)` | Rendement Thermique Indiqué |
| `ηthe = Pe / (ṁf × PCI)` | Rendement Thermique Effectif |

### Consommations

| Formule | Description |
|---------|-------------|
| `Co = ṁf × 3600` | Consommation Horaire (kg/h) |
| `Cs = (ṁf × 3.6 × 10⁶) / Pe` | Consommation Spécifique (g/kWh) |

## Technologies

- **[Next.js 15](https://nextjs.org/)** - Framework React avec App Router
- **[React 19](https://reactjs.org/)** - Bibliothèque UI
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS 3](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[@dnd-kit](https://dndkit.com/)** - Drag & Drop accessible
- **[Lucide React](https://lucide.dev/)** - Icônes modernes

## SEO et Performance

- Pages statiques générées (SSG)
- Metadata Next.js pour chaque page
- Sitemap XML automatique
- robots.txt configuré
- Optimisation des images
- Code splitting automatique

## Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à [Vercel](https://vercel.com)
2. Déployez automatiquement

### Autre hébergeur

```bash
npm run build
npm start
```

## Contribution

Les contributions sont bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Projet sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## Auteur

Développé pour la communauté d'ingénierie automobile et mécanique.

## Ressources Pédagogiques

Cet outil est conçu pour accompagner les cours de :

- Thermodynamique des moteurs
- Génie mécanique
- Ingénierie automobile
- Conversion d'énergie

---

<p align="center">
  <sub>Fait avec passion pour l'ingénierie automobile</sub>
</p>
