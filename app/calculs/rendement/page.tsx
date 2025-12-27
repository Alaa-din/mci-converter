'use client';

import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { calculateRendementMecanique, calculateRendementThermiqueEffectif, calculateRendementThermiqueIndique } from '@/lib/mci';
import CalculatorLayout, { CalculatorForm } from '@/components/CalculatorLayout';
import PedagogicalSteps from '@/components/PedagogicalSteps';

export default function RendementCalculator() {
  const [calcType, setCalcType] = useState<'meca' | 'thermiqueInd' | 'thermiqueEff'>('meca');
  const [Pe, setPe] = useState('');
  const [Pi, setPi] = useState('');
  const [mf, setMf] = useState('');
  const [PCI, setPCI] = useState('44000');
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    try {
      let calcResult;

      if (calcType === 'meca') {
        const params = {
          Pe: parseFloat(Pe) * 1000,
          Pi: parseFloat(Pi) * 1000,
        };
        calcResult = calculateRendementMecanique(params, showSteps);
      } else if (calcType === 'thermiqueInd') {
        const params = {
          Pi: parseFloat(Pi) * 1000,
          mf: parseFloat(mf),
          PCI: parseFloat(PCI),
        };
        calcResult = calculateRendementThermiqueIndique(params, showSteps);
      } else {
        const params = {
          Pe: parseFloat(Pe) * 1000,
          mf: parseFloat(mf),
          PCI: parseFloat(PCI),
        };
        calcResult = calculateRendementThermiqueEffectif(params, showSteps);
      }

      setResult(calcResult);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const presets = [
    { id: 'preset-pe-1', label: 'Citadine', value: 80, unit: 'kW', targetInput: 'Pe' },
    { id: 'preset-pi-1', label: 'Citadine+', value: 100, unit: 'kW', targetInput: 'Pi' },
    { id: 'preset-mf-1', label: 'Bas débit', value: 0.003, unit: 'kg/s', targetInput: 'mf' },
    { id: 'preset-pci-1', label: 'Essence', value: 44000, unit: 'kJ/kg', targetInput: 'PCI' },
    { id: 'preset-pci-2', label: 'Diesel', value: 42500, unit: 'kJ/kg', targetInput: 'PCI' },
  ];

  return (
    <CalculatorLayout
      title="Rendements Moteur"
      description="Calculateur de rendements mécanique et thermiques"
      icon={<TrendingUp className="w-10 h-10 text-blue-400" />}
    >
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-300 mb-2">Définitions</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p><strong>Rendement mécanique</strong> : ηm = Pe / Pi (pertes par frottements)</p>
          <p><strong>Rendement thermique indiqué</strong> : ηthi = Pi / (ṁf × PCI)</p>
          <p><strong>Rendement thermique effectif</strong> : ηthe = Pe / (ṁf × PCI)</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white/70 mb-2">Type de rendement</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <button
            onClick={() => setCalcType('meca')}
            className={`py-2 px-3 rounded-lg font-medium transition-all text-sm ${
              calcType === 'meca'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Mécanique
          </button>
          <button
            onClick={() => setCalcType('thermiqueInd')}
            className={`py-2 px-3 rounded-lg font-medium transition-all text-sm ${
              calcType === 'thermiqueInd'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Thermique indiqué
          </button>
          <button
            onClick={() => setCalcType('thermiqueEff')}
            className={`py-2 px-3 rounded-lg font-medium transition-all text-sm ${
              calcType === 'thermiqueEff'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Thermique effectif
          </button>
        </div>
      </div>

      <CalculatorForm
        inputs={
          calcType === 'meca'
            ? [
                {
                  id: 'Pe',
                  label: 'Puissance effective (Pe)',
                  value: Pe,
                  onChange: setPe,
                  unit: 'kW',
                  placeholder: '80',
                },
                {
                  id: 'Pi',
                  label: 'Puissance indiquée (Pi)',
                  value: Pi,
                  onChange: setPi,
                  unit: 'kW',
                  placeholder: '100',
                },
              ]
            : calcType === 'thermiqueInd'
            ? [
                {
                  id: 'Pi',
                  label: 'Puissance indiquée (Pi)',
                  value: Pi,
                  onChange: setPi,
                  unit: 'kW',
                  placeholder: '100',
                },
                {
                  id: 'mf',
                  label: 'Débit massique (ṁf)',
                  value: mf,
                  onChange: setMf,
                  unit: 'kg/s',
                  placeholder: '0.003',
                },
                {
                  id: 'PCI',
                  label: 'PCI carburant',
                  value: PCI,
                  onChange: setPCI,
                  unit: 'kJ/kg',
                  placeholder: '44000',
                },
              ]
            : [
                {
                  id: 'Pe',
                  label: 'Puissance effective (Pe)',
                  value: Pe,
                  onChange: setPe,
                  unit: 'kW',
                  placeholder: '80',
                },
                {
                  id: 'mf',
                  label: 'Débit massique (ṁf)',
                  value: mf,
                  onChange: setMf,
                  unit: 'kg/s',
                  placeholder: '0.003',
                },
                {
                  id: 'PCI',
                  label: 'PCI carburant',
                  value: PCI,
                  onChange: setPCI,
                  unit: 'kJ/kg',
                  placeholder: '44000',
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
                  Rendement {calcType === 'meca' ? 'Mécanique' : calcType === 'thermiqueInd' ? 'Thermique Indiqué' : 'Thermique Effectif'} :
                </p>
                <p className="text-4xl font-bold mb-2">
                  {(result.value * 100).toFixed(2)} <span className="text-2xl">%</span>
                </p>
                <p className="text-sm text-white/60">
                  {result.value.toFixed(4)} (sans unité)
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
