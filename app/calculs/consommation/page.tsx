'use client';

import React, { useState } from 'react';
import { Fuel } from 'lucide-react';
import { calculateCo, calculateCs } from '@/lib/mci';
import CalculatorLayout, { CalculatorForm } from '@/components/CalculatorLayout';
import PedagogicalSteps from '@/components/PedagogicalSteps';

export default function ConsommationCalculator() {
  const [calcType, setCalcType] = useState<'Co' | 'Cs'>('Co');
  const [mf, setMf] = useState('');
  const [Pe, setPe] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    try {
      if (calcType === 'Co') {
        const params = {
          mf: parseFloat(mf),
        };
        const calcResult = calculateCo(params, showSteps);
        setResult(calcResult);
      } else {
        const params = {
          mf: parseFloat(mf),
          Pe: parseFloat(Pe) * 1000,
        };
        const calcResult = calculateCs(params, showSteps);
        setResult(calcResult);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const presets = [
    { id: 'preset-mf-1', label: 'Bas débit', value: 0.002, unit: 'kg/s', targetInput: 'mf' },
    { id: 'preset-mf-2', label: 'Haut débit', value: 0.008, unit: 'kg/s', targetInput: 'mf' },
    { id: 'preset-pe-1', label: 'Citadine', value: 80, unit: 'kW', targetInput: 'Pe' },
    { id: 'preset-pe-2', label: 'Sportive', value: 250, unit: 'kW', targetInput: 'Pe' },
  ];

  return (
    <CalculatorLayout
      title="Consommation Moteur"
      description="Calculateur de consommation horaire (Co) et spécifique (Cs)"
      icon={<Fuel className="w-10 h-10 text-blue-400" />}
    >
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-300 mb-2">Définitions</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p><strong>Consommation horaire (Co)</strong> : Quantité de carburant consommée par heure</p>
          <p><strong>Consommation spécifique (Cs)</strong> : Quantité de carburant pour produire 1 kWh</p>
        </div>
        <div className="bg-black/20 rounded px-3 py-2 border border-white/10 mt-3">
          <p className="font-mono text-sm">Co = ṁf × 3600 (kg/h)</p>
          <p className="font-mono text-sm mt-1">Cs = (ṁf × 3.6 × 10⁶) / Pe (g/kWh)</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white/70 mb-2">Type de consommation</label>
        <div className="flex gap-2">
          <button
            onClick={() => setCalcType('Co')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              calcType === 'Co'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Horaire (Co)
          </button>
          <button
            onClick={() => setCalcType('Cs')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              calcType === 'Cs'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Spécifique (Cs)
          </button>
        </div>
      </div>

      <CalculatorForm
        inputs={
          calcType === 'Co'
            ? [
                {
                  id: 'mf',
                  label: 'Débit massique (ṁf)',
                  value: mf,
                  onChange: setMf,
                  unit: 'kg/s',
                  placeholder: '0.003',
                },
              ]
            : [
                {
                  id: 'mf',
                  label: 'Débit massique (ṁf)',
                  value: mf,
                  onChange: setMf,
                  unit: 'kg/s',
                  placeholder: '0.003',
                },
                {
                  id: 'Pe',
                  label: 'Puissance effective (Pe)',
                  value: Pe,
                  onChange: setPe,
                  unit: 'kW',
                  placeholder: '100',
                },
              ]
        }
        presets={presets}
        onCalculate={handleCalculate}
        showSteps={showSteps}
        onToggleSteps={setShowSteps}
        result={
          result && (
            <>
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mt-6">
                <p className="text-sm text-white/70 mb-2">
                  Consommation {calcType === 'Co' ? 'Horaire' : 'Spécifique'} :
                </p>
                <p className="text-4xl font-bold mb-2">
                  {result.value.toFixed(2)} <span className="text-2xl">{result.unit}</span>
                </p>
              </div>

              {showSteps && result.steps && (
                <PedagogicalSteps steps={result.steps} interpretation={result.interpretation} />
              )}

              {!showSteps && result.interpretation && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-4">
                  <p className="text-sm text-white/80">{result.interpretation}</p>
                </div>
              )}
            </>
          )
        }
      />
    </CalculatorLayout>
  );
}
