import Link from 'next/link';
import { Calculator, Gauge, Thermometer, Droplet, Zap, Wind, BookOpen, Activity, Fuel, TrendingUp } from 'lucide-react';
import UnitConverter from '@/components/UnitConverter';

export default function HomePage() {
  const calculators = [
    { href: '/calculs/pme', icon: Gauge, title: 'PME', desc: 'Pression Moyenne Effective' },
    { href: '/calculs/pmi', icon: Activity, title: 'PMI', desc: 'Pression Moyenne Indiquée' },
    { href: '/calculs/puissance', icon: Zap, title: 'Puissance', desc: 'Pe et Pi' },
    { href: '/calculs/couple', icon: Gauge, title: 'Couple', desc: 'Ce et Ci' },
    { href: '/calculs/rendement', icon: TrendingUp, title: 'Rendements', desc: 'Mécanique et thermique' },
    { href: '/calculs/consommation', icon: Fuel, title: 'Consommation', desc: 'Co et Cs' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-10 h-10 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold">Calculateur MCI</h1>
              <p className="text-white/70 text-sm">Moteurs à Combustion Interne</p>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-blue-300 mb-1">Outil pédagogique complet</h2>
                <p className="text-sm text-white/80">
                  Calculateur professionnel pour ingénieurs et étudiants avec mode pas-à-pas,
                  formules détaillées et interprétations physiques.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="group bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/50 rounded-xl p-4 transition-all hover:scale-105"
                >
                  <Icon className="w-6 h-6 text-blue-400 mb-2" />
                  <h3 className="font-semibold mb-1">{calc.title}</h3>
                  <p className="text-xs text-white/60">{calc.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <UnitConverter />
      </div>
    </div>
  );
}
