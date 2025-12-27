import { EngineParams, CalculationResult, CalculationStep } from './types';

export function calculateCe(params: EngineParams, showSteps = false): CalculationResult {
  const { Pe, N } = params;

  if (!Pe || !N) {
    throw new Error('Pe et N sont requis pour calculer Ce');
  }

  const omega = (2 * Math.PI * N) / 60;
  const Ce = Pe / omega;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Conversion de la vitesse de rotation',
      formula: 'ω = (2π × N) / 60',
      substitution: `ω = (2π × ${N}) / 60`,
      result: `ω = ${omega.toFixed(4)} rad/s`
    },
    {
      description: 'Calcul du couple effectif',
      formula: 'Ce = Pe / ω',
      substitution: `Ce = ${Pe} / ${omega.toFixed(4)}`,
      result: `Ce = ${Ce.toFixed(2)} N·m`
    }
  ] : [];

  return {
    value: Ce,
    unit: 'N·m',
    steps,
    interpretation: `Un couple effectif de ${Ce.toFixed(2)} N·m est disponible à l'arbre moteur à ${N} tr/min.`
  };
}

export function calculateCi(params: EngineParams, showSteps = false): CalculationResult {
  const { Pi, N } = params;

  if (!Pi || !N) {
    throw new Error('Pi et N sont requis pour calculer Ci');
  }

  const omega = (2 * Math.PI * N) / 60;
  const Ci = Pi / omega;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Conversion de la vitesse de rotation',
      formula: 'ω = (2π × N) / 60',
      substitution: `ω = (2π × ${N}) / 60`,
      result: `ω = ${omega.toFixed(4)} rad/s`
    },
    {
      description: 'Calcul du couple indiqué',
      formula: 'Ci = Pi / ω',
      substitution: `Ci = ${Pi} / ${omega.toFixed(4)}`,
      result: `Ci = ${Ci.toFixed(2)} N·m`
    }
  ] : [];

  return {
    value: Ci,
    unit: 'N·m',
    steps,
    interpretation: `Un couple indiqué de ${Ci.toFixed(2)} N·m représente le couple théorique développé dans les cylindres.`
  };
}
