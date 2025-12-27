# 🔧 MCI Converter - Convertisseur d'Unités pour Moteurs à Combustion Interne

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Un convertisseur d'unités moderne et élégant, spécialement conçu pour les ingénieurs et passionnés de moteurs à combustion interne (MCI).

![MCI Converter Screenshot](./docs/screenshot.png)

## ✨ Fonctionnalités

- **6 catégories de conversion** :
  - ⚡ **Puissance** : Watt, Kilowatt, Cheval vapeur (CV), Horsepower (HP)
  - 🎯 **Couple** : Newton-mètre, Kilogramme-mètre, Livre-pied
  - 💨 **Pression** : Pascal, Kilopascal, Bar, PSI, Atmosphère
  - 🌡️ **Température** : Celsius, Fahrenheit, Kelvin
  - 💧 **Cylindrée/Volume** : cm³, Litre, in³
  - 🔄 **Vitesse de rotation** : RPM, rad/s, Hz

- **Interface moderne** avec effets glassmorphisme et gradient sombre
- **Responsive** : fonctionne sur desktop, tablette et mobile
- **Temps réel** : conversion instantanée avec précision jusqu'à 4 décimales

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- npm ou yarn

### Étapes

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Alaa-din/mci-converter.git
   cd mci-converter
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:5173
   ```

## 📦 Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run preview` | Prévisualise la version de production |

## 🛠️ Technologies Utilisées

- **[React 19](https://reactjs.org/)** - Bibliothèque UI
- **[Vite 7](https://vitejs.dev/)** - Outil de build ultra-rapide
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[Lucide React](https://lucide.dev/)** - Icônes modernes

## 📐 Formules de Conversion

### Puissance
| Unité | Facteur (vers Watt) |
|-------|---------------------|
| W | 1 |
| kW | 1000 |
| ch (CV) | 735.5 |
| hp | 745.7 |

### Couple
| Unité | Facteur (vers N·m) |
|-------|---------------------|
| N·m | 1 |
| kg·m | 9.80665 |
| lb·ft | 1.35582 |

### Pression
| Unité | Facteur (vers Pa) |
|-------|-------------------|
| Pa | 1 |
| kPa | 1000 |
| bar | 100000 |
| psi | 6894.76 |
| atm | 101325 |

### Température
- °C → °F : `(°C × 9/5) + 32`
- °C → K : `°C + 273.15`
- °F → °C : `(°F - 32) × 5/9`

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

Développé avec ❤️ pour la communauté automobile et mécanique.

---

<p align="center">
  <sub>⭐ N'oubliez pas de mettre une étoile si ce projet vous a été utile !</sub>
</p>
