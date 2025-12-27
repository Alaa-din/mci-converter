'use client';

import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

interface DraggableInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  placeholder?: string;
}

export function DraggableInput({ id, label, value, onChange, unit, placeholder }: DraggableInputProps) {
  const { setNodeRef } = useDroppable({
    id: `input-${id}`,
  });

  return (
    <div ref={setNodeRef} className="relative">
      <label className="block text-sm font-medium text-white/70 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 pr-16 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder || '0'}
          step="any"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">
          {unit}
        </span>
      </div>
    </div>
  );
}

interface DraggablePresetProps {
  id: string;
  label: string;
  value: number;
  unit: string;
}

export function DraggablePreset({ id, label, value, unit }: DraggablePresetProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { value },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-4 py-3 cursor-move transition-all hover:scale-105 flex items-center gap-2"
    >
      <GripVertical className="w-4 h-4 text-white/40" />
      <div className="flex-1">
        <p className="text-xs text-white/60">{label}</p>
        <p className="font-semibold">
          {value} <span className="text-sm text-white/60">{unit}</span>
        </p>
      </div>
    </div>
  );
}
