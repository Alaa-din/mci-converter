'use client';

import React from 'react';
import { CalculationStep } from '@/lib/mci';
import { BookOpen } from 'lucide-react';

interface PedagogicalStepsProps {
  steps: CalculationStep[];
  interpretation?: string;
}

export default function PedagogicalSteps({ steps, interpretation }: PedagogicalStepsProps) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-blue-300">Mode Étudiant - Résolution pas à pas</h3>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <h4 className="font-semibold text-white/90">{step.description}</h4>
            </div>

            <div className="ml-8 space-y-2">
              <div>
                <p className="text-xs text-white/50 mb-1">Formule :</p>
                <p className="font-mono text-sm bg-black/20 px-3 py-2 rounded border border-white/10">
                  {step.formula}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/50 mb-1">Substitution :</p>
                <p className="font-mono text-sm bg-black/20 px-3 py-2 rounded border border-white/10">
                  {step.substitution}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/50 mb-1">Résultat :</p>
                <p className="font-mono text-sm bg-green-500/20 px-3 py-2 rounded border border-green-500/30 font-semibold">
                  {step.result}
                </p>
              </div>
            </div>
          </div>
        ))}

        {interpretation && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
            <p className="text-xs text-green-400 font-semibold mb-1">Interprétation physique :</p>
            <p className="text-sm text-white/90">{interpretation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
