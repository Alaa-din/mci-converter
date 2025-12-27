'use client';

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { calculatePe, calculatePi, calculatePeFromPME } from '@/lib/mci';
import CalculatorLayout, { CalculatorForm } from '@/components/CalculatorLayout';
import PedagogicalSteps from '@/components/PedagogicalSteps';

export default function PuissanceCalculator() {
  const [calcType, setCalcType] = useState<'Pe' | 'Pi'>('Pe');
  const [method, setMethod] = useState<'torque' | 'pme'>('torque');
  const [C, setC] = useState('');
  const [N, setN] = useState('');
  const [PME, setPME] = useState('');
  const [Vd, setVd] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    try {
      const params: any = {
        N: parseFloat(N),
      };

      if (calcType === 'Pe') {
        if (method === 'torque') {
          params.Ce = parseFloat(C);
          setResult(calculatePe(params, showSteps));
        } else {
          params.PME = parseFloat(PME) * 1e5; // Convert bar to Pa
          params.Vd = parseFloat(Vd) / 1e6; // Convert cm3 to m3
          setResult(calculatePeFromPME(params, showSteps));
        }
      } else {
        params.Ci = parseFloat(C);
        setResult(calculatePi(params, showSteps));
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const presets = [
    { id: 'preset-c-1', label: 'Citadine', value: 150, unit: 'N·m', targetInput: 'C' },
    { id: 'preset-c-2', label: 'Sportive', value: 400, unit: 'N·m', targetInput: 'C' },
    { id: 'preset-n-1', label: 'Régime bas', value: 2000, unit: 'tr/min', targetInput: 'N' },
    { id: 'preset-n-2', label: 'Régime haut', value: 6000, unit: 'tr/min', targetInput: 'N' },
    { id: 'preset-pme-1', label: 'PME Std', value: 10, unit: 'bar', targetInput: 'PME' },
    { id: 'preset-vd-1', label: '2.0L', value: 2000, unit: 'cm³', targetInput: 'Vd' },
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
          <strong>Pe (Puissance effective)</strong> : Puissance disponible à l&apos;arbre moteur.
          <br />
          <strong>Pi (Puissance indiquée)</strong> : Puissance théorique développée dans les cylindres.
        </p>
        <div className="bg-black/20 rounded px-3 py-2 border border-white/10">
          {method === 'torque' ? (
            <p className="font-mono text-sm">P = C × ω = C × (2π × N) / 60</p>
          ) : (
            <p className="font-mono text-sm">Pe = (PME × Vd × N) / 120 (4 temps)</p>
          )}
          <p className="text-xs text-white/60 mt-2">
            C : Couple (N·m) | N : Vitesse (tr/min) | PME : Pression (Pa) | Vd : Cylindrée (m³)
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white/70 mb-2">Type de calcul</label>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setCalcType('Pe')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${calcType === 'Pe'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
          >
            Puissance effective (Pe)
          </button>
          <button
            onClick={() => setCalcType('Pi')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${calcType === 'Pi'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
          >
            Puissance indiquée (Pi)
          </button>
        </div>

        {calcType === 'Pe' && (
          <div className="flex gap-2">
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
              onClick={() => setMethod('pme')}
              className={`flex-1 py-1.5 text-sm rounded-lg transition-all ${method === 'pme'
                  ? 'bg-blue-400/20 text-blue-300 border border-blue-400/50'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
            >
              Via PME (4 temps)
            </button>
          </div>
        )}
      </div>

      <CalculatorForm
        inputs={[
          ...(calcType === 'Pe' && method === 'pme' ? [
            {
              id: 'PME',
              label: 'Pression Moyenne Effective (PME)',
              value: PME,
              onChange: setPME,
              unit: 'bar',
              placeholder: '10',
            },
            {
              id: 'Vd',
              label: 'Cylindrée (Vt)',
              value: Vd,
              onChange: setVd,
              unit: 'cm³',
              placeholder: '2000',
            }
          ] : [
            {
              id: 'C',
              label: calcType === 'Pe' ? 'Couple effectif (Ce)' : 'Couple indiqué (Ci)',
              value: C,
              onChange: setC,
              unit: 'N·m',
              placeholder: '200',
            }
          ]),
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
