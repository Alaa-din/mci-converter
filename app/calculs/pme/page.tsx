'use client';

import React, { useState } from 'react';
import { Gauge } from 'lucide-react';
import { calculatePME, calculatePMEFromPe } from '@/lib/mci';
import CalculatorLayout, { CalculatorForm } from '@/components/CalculatorLayout';
import PedagogicalSteps from '@/components/PedagogicalSteps';
import type { Metadata } from 'next';

export default function PMECalculator() {
  const [method, setMethod] = useState<'torque' | 'power'>('torque');
  const [Ce, setCe] = useState('');
  const [Pe, setPe] = useState('');
  const [N, setN] = useState('');
  const [Vd, setVd] = useState('');
  const [tau, setTau] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    try {
      const params: any = {
        Vd: parseFloat(Vd) / 1e6, // cm3 -> m3
      };

      if (method === 'torque') {
        params.Ce = parseFloat(Ce);
        params.tau = parseFloat(tau);
        setResult(calculatePME(params, showSteps));
      } else {
        params.Pe = parseFloat(Pe) * 1000; // kW -> W
        params.N = parseFloat(N);
        setResult(calculatePMEFromPe(params, showSteps));
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const presets = [
    { id: 'preset-ce-1', label: 'Citadine (Ce)', value: 150, unit: 'N·m', targetInput: 'Ce' },
    { id: 'preset-ce-2', label: 'Sportive (Ce)', value: 400, unit: 'N·m', targetInput: 'Ce' },
    { id: 'preset-pe-1', label: '70 kW', value: 70, unit: 'kW', targetInput: 'Pe' },
    { id: 'preset-pe-2', label: '200 kW', value: 200, unit: 'kW', targetInput: 'Pe' },
    { id: 'preset-vd-1', label: '1.6L', value: 1600, unit: 'cm³', targetInput: 'Vd' },
    { id: 'preset-vd-2', label: '3.0L', value: 3000, unit: 'cm³', targetInput: 'Vd' },
    { id: 'preset-tau-1', label: '4 temps', value: 2, unit: '', targetInput: 'tau' },
    { id: 'preset-tau-2', label: '2 temps', value: 1, unit: '', targetInput: 'tau' },
  ];

  return (
    <CalculatorLayout
      title="Pression Moyenne Effective (PME)"
      description="Calculateur de pression moyenne effective pour moteurs à combustion interne"
      icon={<Gauge className="w-10 h-10 text-blue-400" />}
    >
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-300 mb-2">Définition</h3>
        <p className="text-sm text-white/80 mb-3">
          La PME représente la pression constante fictive qui, appliquée pendant la course motrice,
          produirait le même travail que le cycle réel. C&apos;est un indicateur de l&apos;efficacité du moteur.
        </p>
        <div className="bg-black/20 rounded px-3 py-2 border border-white/10">
          {method === 'torque' ? (
            <p className="font-mono text-sm">PME = (Ce × τ × 2π) / Vd</p>
          ) : (
            <p className="font-mono text-sm">PME = (Pe × 120) / (Vd × N) (4 temps)</p>
          )}
          <p className="text-xs text-white/60 mt-2">
            Ce : Couple (N·m) | Pe : Puissance (W) | Vd : Cylindrée (m³) | N : Vitesse (tr/min)
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMethod('torque')}
          className={`flex-1 py-1.5 text-sm rounded-lg transition-all ${method === 'torque'
            ? 'bg-blue-400/20 text-blue-300 border border-blue-400/50'
            : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
        >
          Via Couple (Ce)
        </button>
        <button
          onClick={() => setMethod('power')}
          className={`flex-1 py-1.5 text-sm rounded-lg transition-all ${method === 'power'
            ? 'bg-blue-400/20 text-blue-300 border border-blue-400/50'
            : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
        >
          Via Puissance (Pe) - 4 temps
        </button>
      </div>

      <CalculatorForm
        inputs={[
          ...(method === 'torque' ? [
            {
              id: 'Ce',
              label: 'Couple effectif (Ce)',
              value: Ce,
              onChange: setCe,
              unit: 'N·m',
              placeholder: '200',
            },
            {
              id: 'tau',
              label: 'Rapport de cycle (τ)',
              value: tau,
              onChange: setTau,
              unit: '',
              placeholder: '2',
            },
          ] : [
            {
              id: 'Pe',
              label: 'Puissance effective (Pe)',
              value: Pe,
              onChange: setPe,
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
          ]),
          {
            id: 'Vd',
            label: 'Cylindrée (Vd)',
            value: Vd,
            onChange: setVd,
            unit: 'cm³',
            placeholder: '2000',
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
                <p className="text-sm text-white/70 mb-2">Pression Moyenne Effective :</p>
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
