'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Gauge, Thermometer, Droplet, Zap, Wind } from 'lucide-react';

interface Category {
  name: string;
  icon: any;
  special?: boolean;
  units: any;
}

const categories: Record<string, Category> = {
  puissance: {
    name: 'Puissance',
    icon: Zap,
    units: {
      'W': { name: 'Watt', factor: 1 },
      'kW': { name: 'Kilowatt', factor: 1000 },
      'ch': { name: 'Cheval vapeur (metric)', factor: 735.5 },
      'hp': { name: 'Horsepower (imperial)', factor: 745.7 }
    }
  },
  couple: {
    name: 'Couple',
    icon: Gauge,
    units: {
      'Nm': { name: 'Newton-mètre', factor: 1 },
      'kgm': { name: 'Kilogramme-mètre', factor: 9.80665 },
      'lbft': { name: 'Livre-pied', factor: 1.35582 }
    }
  },
  pression: {
    name: 'Pression',
    icon: Wind,
    units: {
      'Pa': { name: 'Pascal', factor: 1 },
      'kPa': { name: 'Kilopascal', factor: 1000 },
      'bar': { name: 'Bar', factor: 100000 },
      'psi': { name: 'PSI', factor: 6894.76 },
      'atm': { name: 'Atmosphère', factor: 101325 }
    }
  },
  temperature: {
    name: 'Température',
    icon: Thermometer,
    special: true,
    units: ['°C', '°F', 'K']
  },
  volume: {
    name: 'Cylindrée/Volume',
    icon: Droplet,
    units: {
      'cm³': { name: 'Centimètre cube', factor: 1 },
      'L': { name: 'Litre', factor: 1000 },
      'in³': { name: 'Pouce cube', factor: 16.3871 }
    }
  },
  vitesse: {
    name: 'Vitesse de rotation',
    icon: Calculator,
    units: {
      'rpm': { name: 'Tours/minute', factor: 1 },
      'rad/s': { name: 'Radians/seconde', factor: 9.5493 },
      'Hz': { name: 'Hertz', factor: 60 }
    }
  }
};

const UnitConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState('puissance');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;

    if (from === '°C') celsius = value;
    else if (from === '°F') celsius = (value - 32) * 5 / 9;
    else if (from === 'K') celsius = value - 273.15;
    else celsius = value;

    if (to === '°C') return celsius;
    else if (to === '°F') return celsius * 9 / 5 + 32;
    else if (to === 'K') return celsius + 273.15;
    return celsius;
  };

  const convertStandard = (value: number, fromFactor: number, toFactor: number): number => {
    return (value * fromFactor) / toFactor;
  };

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || inputValue === '') {
      setResult(null);
      return;
    }

    let converted: number;
    const category = categories[selectedCategory];

    if (category.special && selectedCategory === 'temperature') {
      converted = convertTemperature(val, fromUnit, toUnit);
    } else {
      const fromFactor = category.units[fromUnit]?.factor || 1;
      const toFactor = category.units[toUnit]?.factor || 1;
      converted = convertStandard(val, fromFactor, toFactor);
    }

    setResult(converted.toFixed(4));
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  const currentCategory = categories[selectedCategory];
  const Icon = currentCategory.icon;

  useEffect(() => {
    if (currentCategory.special) {
      setFromUnit(currentCategory.units[0]);
      setToUnit(currentCategory.units[1]);
    } else {
      const unitKeys = Object.keys(currentCategory.units);
      setFromUnit(unitKeys[0]);
      setToUnit(unitKeys[1]);
    }
    // Don't clear input value on category change, just let it recalculate or persist if appropriate.
    // Actually, clearing it might be safer to avoid confusion, but user might want to keep the number.
    // Let's keep the clear behavior for now as per previous logic, but maybe that conflicts with the new effect?
    // No, if we setInputValue(''), the other effect triggers and clears result.
    setInputValue('');
    setResult(null);
  }, [selectedCategory]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-blue-400" />
        <h2 className="text-2xl font-bold">Convertisseur d&apos;unités</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {Object.entries(categories).map(([key, cat]) => {
          const CategoryIcon = cat.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${selectedCategory === key
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
            >
              <CategoryIcon className="w-5 h-5" />
              <span className="text-xs font-medium">{cat.name}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold">{currentCategory.name}</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Valeur à convertir
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez une valeur"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">De</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currentCategory.special
                  ? (currentCategory.units as string[]).map((unit) => (
                    <option key={unit} value={unit} className="bg-slate-800">
                      {unit}
                    </option>
                  ))
                  : Object.entries(currentCategory.units).map(([key, unit]: [string, any]) => (
                    <option key={key} value={key} className="bg-slate-800">
                      {unit.name} ({key})
                    </option>
                  ))
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Vers</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currentCategory.special
                  ? (currentCategory.units as string[]).map((unit) => (
                    <option key={unit} value={unit} className="bg-slate-800">
                      {unit}
                    </option>
                  ))
                  : Object.entries(currentCategory.units).map(([key, unit]: [string, any]) => (
                    <option key={key} value={key} className="bg-slate-800">
                      {unit.name} ({key})
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          {result !== null && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-white/70 mb-1">Résultat :</p>
              <p className="text-2xl font-bold">{result} {toUnit}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
