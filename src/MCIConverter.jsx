import React, { useState } from 'react';
import { Calculator, Gauge, Thermometer, Droplet, Zap, Wind } from 'lucide-react';

const MCIConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState('puissance');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState(null);

  const categories = {
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

  const convertTemperature = (value, from, to) => {
    let celsius;
    
    if (from === '°C') celsius = value;
    else if (from === '°F') celsius = (value - 32) * 5/9;
    else if (from === 'K') celsius = value - 273.15;
    
    if (to === '°C') return celsius;
    else if (to === '°F') return celsius * 9/5 + 32;
    else if (to === 'K') return celsius + 273.15;
  };

  const convertStandard = (value, fromFactor, toFactor) => {
    return (value * fromFactor) / toFactor;
  };

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult('Valeur invalide');
      return;
    }

    let converted;
    const category = categories[selectedCategory];

    if (category.special && selectedCategory === 'temperature') {
      converted = convertTemperature(val, fromUnit, toUnit);
    } else {
      const fromFactor = category.units[fromUnit].factor;
      const toFactor = category.units[toUnit].factor;
      converted = convertStandard(val, fromFactor, toFactor);
    }

    setResult(converted.toFixed(4));
  };

  const currentCategory = categories[selectedCategory];
  const Icon = currentCategory.icon;

  React.useEffect(() => {
    if (currentCategory.special) {
      setFromUnit(currentCategory.units[0]);
      setToUnit(currentCategory.units[1]);
    } else {
      const unitKeys = Object.keys(currentCategory.units);
      setFromUnit(unitKeys[0]);
      setToUnit(unitKeys[1]);
    }
    setInputValue('');
    setResult(null);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-10 h-10 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">
              Convertisseur MCI
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {Object.entries(categories).map(([key, cat]) => {
              const CategoryIcon = cat.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    selectedCategory === key
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <CategoryIcon className="w-6 h-6" />
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                {currentCategory.name}
              </h2>
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
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    De
                  </label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {currentCategory.special
                      ? currentCategory.units.map((unit) => (
                          <option key={unit} value={unit} className="bg-slate-800">
                            {unit}
                          </option>
                        ))
                      : Object.entries(currentCategory.units).map(([key, unit]) => (
                          <option key={key} value={key} className="bg-slate-800">
                            {unit.name} ({key})
                          </option>
                        ))
                    }
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Vers
                  </label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {currentCategory.special
                      ? currentCategory.units.map((unit) => (
                          <option key={unit} value={unit} className="bg-slate-800">
                            {unit}
                          </option>
                        ))
                      : Object.entries(currentCategory.units).map(([key, unit]) => (
                          <option key={key} value={key} className="bg-slate-800">
                            {unit.name} ({key})
                          </option>
                        ))
                    }
                  </select>
                </div>
              </div>

              <button
                onClick={handleConvert}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
              >
                Convertir
              </button>

              {result !== null && (
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-sm text-white/70 mb-1">Résultat :</p>
                  <p className="text-2xl font-bold text-white">
                    {result} {toUnit}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white/70 mb-2">
              💡 Info
            </h3>
            <p className="text-xs text-white/50">
              Cet outil convertit les unités couramment utilisées dans l'étude des moteurs à combustion interne : puissance, couple, pression, température, cylindrée et vitesse de rotation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCIConverter;