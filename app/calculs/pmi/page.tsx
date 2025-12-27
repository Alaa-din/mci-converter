'use client';

import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { calculatePMI } from '@/lib/mci';
import CalculatorLayout, { CalculatorForm } from '@/components/CalculatorLayout';
import PedagogicalSteps from '@/components/PedagogicalSteps';

export default function PMICalculator() {
  const [Ci, setCi] = useState('');
  const [Vd, setVd] = useState('');
  const [tau, setTau] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    try {
      const params = {
        Ci: parseFloat(Ci),
        Vd: parseFloat(Vd) / 1e6,
        tau: parseFloat(tau),
      };

      const calcResult = calculatePMI(params, showSteps);
      setResult(calcResult);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const presets = [
    { id: 'preset-ci-1', label: 'Citadine', value: 180, unit: 'N·m', targetInput: 'Ci' },
    { id: 'preset-ci-2', label: 'Sportive', value: 450, unit: 'N·m', targetInput: 'Ci' },
    { id: 'preset-vd-1', label: '1.6L', value: 1600, unit: 'cm³', targetInput: 'Vd' },
    { id: 'preset-vd-2', label: '3.0L', value: 3000, unit: 'cm³', targetInput: 'Vd' },
  ];

  return (
    <CalculatorLayout
      title="Pression Moyenne Indiquée (PMI)"
      description="Calculateur de pression moyenne indiquée pour moteurs à combustion interne"
      icon={<Activity className="w-10 h-10 text-blue-400" />}
    >
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-300 mb-2">Définition</h3>
        <p className="text-sm text-white/80 mb-3">
          La PMI représente la pression théorique développée dans les cylindres sans tenir compte
          des pertes par frottements. Elle est toujours supérieure à la PME.
        </p>
        <div className="bg-black/20 rounded px-3 py-2 border border-white/10">
          <p className="font-mono text-sm">PMI = (Ci × τ × 4π) / Vd</p>
          <p className="text-xs text-white/60 mt-2">
            Ci : Couple indiqué (N·m) | Vd : Cylindrée (m³) | τ : Rapport de cycle
          </p>
        </div>
      </div>

      <CalculatorForm
        inputs={[
          {
            id: 'Ci',
            label: 'Couple indiqué (Ci)',
            value: Ci,
            onChange: setCi,
            unit: 'N·m',
            placeholder: '220',
          },
          {
            id: 'Vd',
            label: 'Cylindrée (Vd)',
            value: Vd,
            onChange: setVd,
            unit: 'cm³',
            placeholder: '2000',
          },
          {
            id: 'tau',
            label: 'Rapport de cycle (τ)',
            value: tau,
            onChange: setTau,
            unit: '',
            placeholder: '2',
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
                <p className="text-sm text-white/70 mb-2">Pression Moyenne Indiquée :</p>
                <p className="text-4xl font-bold mb-2">
                  {(result.value / 1e5).toFixed(2)} <span className="text-2xl">bar</span>
                </p>
                <p className="text-sm text-white/60">
                  ({result.value.toFixed(0)} Pa)
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
