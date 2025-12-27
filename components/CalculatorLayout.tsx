'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { DraggableInput, DraggablePreset } from './DraggableInput';
import PedagogicalSteps from './PedagogicalSteps';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function CalculatorLayout({ title, description, icon, children }: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Link>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            {icon}
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-white/70 text-sm">{description}</p>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

interface CalculatorFormProps {
  inputs: Array<{
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    unit: string;
    placeholder?: string;
  }>;
  presets?: Array<{
    id: string;
    label: string;
    value: number;
    unit: string;
    targetInput: string;
  }>;
  onCalculate: () => void;
  result: React.ReactNode;
  showSteps: boolean;
  onToggleSteps: (show: boolean) => void;
}

export function CalculatorForm({
  inputs,
  presets,
  onCalculate,
  result,
  showSteps,
  onToggleSteps,
}: CalculatorFormProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.data.current) {
      const presetValue = active.data.current.value;
      const inputId = over.id.toString().replace('input-', '');
      const input = inputs.find(i => i.id === inputId);
      if (input) {
        input.onChange(presetValue.toString());
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Données d'entrée</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showSteps}
              onChange={(e) => onToggleSteps(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-white/70 flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Mode étudiant
            </span>
          </label>
        </div>

        {presets && presets.length > 0 && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-xs text-white/60 mb-3">Préréglages (glisser-déposer) :</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {presets.map((preset) => (
                <DraggablePreset
                  key={preset.id}
                  id={preset.id}
                  label={preset.label}
                  value={preset.value}
                  unit={preset.unit}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputs.map((input) => (
            <DraggableInput
              key={input.id}
              id={input.id}
              label={input.label}
              value={input.value}
              onChange={input.onChange}
              unit={input.unit}
              placeholder={input.placeholder}
            />
          ))}
        </div>

        <button
          onClick={onCalculate}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          Calculer
        </button>

        {result}
      </div>
    </DndContext>
  );
}
