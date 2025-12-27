'use client';

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { calculatePe, calculatePi } from '@/lib/mci';
import CalculatorLayout, { CalculatorForm } from '@/components/CalculatorLayout';
import PedagogicalSteps from '@/components/PedagogicalSteps';

export default function PuissanceCalculator() {
  const [calcType, setCalcType] = useState<'Pe' | 'Pi'>('Pe');
  const [C, setC] = useState('');
  const [N, setN] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    try {
      const params = {
        [calcType === 'Pe' ? 'Ce' : 'Ci']: parseFloat(C),
        N: parseFloat(N),
      };

      const calcResult = calcType === 'Pe'
        ? calculatePe(params, showSteps)
        : calculatePi(params, showSteps);
      setResult(calcResult);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const presets = [
    { id: 'preset-c-1', label: 'Citadine', value: 150, unit: 'N·m', targetInput: 'C' },
    { id: 'preset-c-2', label: 'Sportive', value: 400, unit: 'N·m', targetInput: 'C' },
    { id: 'preset-n-1', label: 'Régime bas', value: 2000, unit: 'tr/min', targetInput: 'N' },
    { id: 'preset-n-2', label: 'Régime haut', value: 6000, unit: 'tr/min', targetInput: 'N' },
  ];

  return (
    <CalculatorLayout
      title="Puissance Moteur"
      description="Calculateur de puissance effective (Pe) et indiquée (Pi)"
      icon={<Zap className="w-10 h-10 text-blue-400" />}
    >
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-300 mb-2">Définition</h3>
        <p className="text-sm text-white/80 mb-3">
          <strong>Pe (Puissance effective)</strong> : Puissance disponible à l'arbre moteur.
          <br />
          <strong>Pi (Puissance indiquée)</strong> : Puissance théorique développée dans les cylindres.
        </p>
        <div className="bg-black/20 rounded px-3 py-2 border border-white/10">
          <p className="font-mono text-sm">P = C × ω = C × (2π × N) / 60</p>
          <p className="text-xs text-white/60 mt-2">
            C : Couple (N·m) | N : Vitesse de rotation (tr/min) | ω : Vitesse angulaire (rad/s)
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white/70 mb-2">Type de calcul</label>
        <div className="flex gap-2">
          <button
            onClick={() => setCalcType('Pe')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              calcType === 'Pe'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Puissance effective (Pe)
          </button>
          <button
            onClick={() => setCalcType('Pi')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              calcType === 'Pi'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Puissance indiquée (Pi)
          </button>
        </div>
      </div>

      <CalculatorForm
        inputs={[
          {
            id: 'C',
            label: calcType === 'Pe' ? 'Couple effectif (Ce)' : 'Couple indiqué (Ci)',
            value: C,
            onChange: setC,
            unit: 'N·m',
            placeholder: '200',
          },
          {
            id: 'N',
            label: 'Vitesse de rotation (N)',
            value: N,
            onChange: setN,
            unit: 'tr/min',
            placeholder: '4000',
          },
        ]}
        presets={presets}
        onCalculate={handleCalculate}
        showSteps={showSteps}
        onToggleSteps={setShowSteps}
        result={
          result && (
            <>
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mt-6">
                <p className="text-sm text-white/70 mb-2">
                  {calcType === 'Pe' ? 'Puissance Effective' : 'Puissance Indiquée'} :
                </p>
                <p className="text-4xl font-bold mb-2">
                  {(result.value / 1000).toFixed(2)} <span className="text-2xl">kW</span>
                </p>
                <p className="text-sm text-white/60">
                  {(result.value / 735.5).toFixed(2)} ch | {(result.value / 745.7).toFixed(2)} hp
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
