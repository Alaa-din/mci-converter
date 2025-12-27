import { EngineParams, CalculationResult, CalculationStep } from './types';

export function calculatePe(params: EngineParams, showSteps = false): CalculationResult {
  const { Ce, N } = params;

  if (!Ce || !N) {
    throw new Error('Ce et N sont requis pour calculer Pe');
  }

  const omega = (2 * Math.PI * N) / 60;
  const Pe = Ce * omega;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Conversion de la vitesse de rotation',
      formula: 'ω = (2π × N) / 60',
      substitution: `ω = (2π × ${N}) / 60`,
      result: `ω = ${omega.toFixed(4)} rad/s`
    },
    {
      description: 'Calcul de la puissance effective',
      formula: 'Pe = Ce × ω',
      substitution: `Pe = ${Ce} × ${omega.toFixed(4)}`,
      result: `Pe = ${Pe.toFixed(2)} W`
    }
  ] : [];

  return {
    value: Pe,
    unit: 'W',
    steps,
    interpretation: `Une puissance effective de ${(Pe/1000).toFixed(2)} kW (${(Pe/735.5).toFixed(2)} ch) est disponible à l'arbre moteur.`
  };
}

export function calculatePi(params: EngineParams, showSteps = false): CalculationResult {
  const { Ci, N } = params;

  if (!Ci || !N) {
    throw new Error('Ci et N sont requis pour calculer Pi');
  }

  const omega = (2 * Math.PI * N) / 60;
  const Pi = Ci * omega;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Conversion de la vitesse de rotation',
      formula: 'ω = (2π × N) / 60',
      substitution: `ω = (2π × ${N}) / 60`,
      result: `ω = ${omega.toFixed(4)} rad/s`
    },
    {
      description: 'Calcul de la puissance indiquée',
      formula: 'Pi = Ci × ω',
      substitution: `Pi = ${Ci} × ${omega.toFixed(4)}`,
      result: `Pi = ${Pi.toFixed(2)} W`
    }
  ] : [];

  return {
    value: Pi,
    unit: 'W',
    steps,
    interpretation: `Une puissance indiquée de ${(Pi/1000).toFixed(2)} kW représente la puissance théorique développée dans les cylindres.`
  };
}
