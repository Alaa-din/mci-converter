'use client';

import React, { useState } from 'react';
import { Gauge } from 'lucide-react';
import { calculateCe, calculateCi } from '@/lib/mci';
import CalculatorLayout, { CalculatorForm } from '@/components/CalculatorLayout';
import PedagogicalSteps from '@/components/PedagogicalSteps';

export default function CoupleCalculator() {
  const [calcType, setCalcType] = useState<'Ce' | 'Ci'>('Ce');
  const [P, setP] = useState('');
  const [N, setN] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    try {
      const params = {
        [calcType === 'Ce' ? 'Pe' : 'Pi']: parseFloat(P) * 1000,
        N: parseFloat(N),
      };

      const calcResult = calcType === 'Ce'
        ? calculateCe(params, showSteps)
        : calculateCi(params, showSteps);
      setResult(calcResult);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const presets = [
    { id: 'preset-p-1', label: 'Citadine', value: 80, unit: 'kW', targetInput: 'P' },
    { id: 'preset-p-2', label: 'Sportive', value: 250, unit: 'kW', targetInput: 'P' },
    { id: 'preset-n-1', label: 'Régime bas', value: 2000, unit: 'tr/min', targetInput: 'N' },
    { id: 'preset-n-2', label: 'Régime haut', value: 6000, unit: 'tr/min', targetInput: 'N' },
  ];

  return (
    <CalculatorLayout
      title="Couple Moteur"
      description="Calculateur de couple effectif (Ce) et indiqué (Ci)"
      icon={<Gauge className="w-10 h-10 text-blue-400" />}
    >
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-300 mb-2">Définition</h3>
        <p className="text-sm text-white/80 mb-3">
          <strong>Ce (Couple effectif)</strong> : Couple disponible à l'arbre moteur.
          <br />
          <strong>Ci (Couple indiqué)</strong> : Couple théorique développé dans les cylindres.
        </p>
        <div className="bg-black/20 rounded px-3 py-2 border border-white/10">
          <p className="font-mono text-sm">C = P / ω = P / ((2π × N) / 60)</p>
          <p className="text-xs text-white/60 mt-2">
            P : Puissance (W) | N : Vitesse de rotation (tr/min) | ω : Vitesse angulaire (rad/s)
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white/70 mb-2">Type de calcul</label>
        <div className="flex gap-2">
          <button
            onClick={() => setCalcType('Ce')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              calcType === 'Ce'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Couple effectif (Ce)
          </button>
          <button
            onClick={() => setCalcType('Ci')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              calcType === 'Ci'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Couple indiqué (Ci)
          </button>
        </div>
      </div>

      <CalculatorForm
        inputs={[
          {
            id: 'P',
            label: calcType === 'Ce' ? 'Puissance effective (Pe)' : 'Puissance indiquée (Pi)',
            value: P,
            onChange: setP,
            unit: 'kW',
            placeholder: '100',
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
                  {calcType === 'Ce' ? 'Couple Effectif' : 'Couple Indiqué'} :
                </p>
                <p className="text-4xl font-bold mb-2">
                  {result.value.toFixed(2)} <span className="text-2xl">N·m</span>
                </p>
                <p className="text-sm text-white/60">
                  {(result.value / 9.80665).toFixed(2)} kg·m
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
