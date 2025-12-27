import { EngineParams, CalculationResult, CalculationStep } from './types';

export function calculatePME(params: EngineParams, showSteps = false): CalculationResult {
  const { Ce, Vd, tau } = params;

  if (!Ce || !Vd || !tau) {
    throw new Error('Ce, Vd et tau sont requis pour calculer PME');
  }

  const PME = (Ce * tau * 2 * Math.PI) / Vd;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Formule de la pression moyenne effective',
      formula: 'PME = (Ce × τ × 2π) / Vd',
      substitution: `PME = (${Ce} × ${tau} × 2π) / ${Vd}`,
      result: `PME = ${PME.toFixed(2)} Pa`
    }
  ] : [];

  return {
    value: PME,
    unit: 'Pa',
    steps,
    interpretation: `Une PME de ${(PME / 1e5).toFixed(2)} bar indique la pression moyenne exercée sur le piston pendant la course motrice.`
  };
}

export function calculatePMI(params: EngineParams, showSteps = false): CalculationResult {
  const { Ci, Vd, tau } = params;

  if (!Ci || !Vd || !tau) {
    throw new Error('Ci, Vd et tau sont requis pour calculer PMI');
  }

  const PMI = (Ci * tau * 2 * Math.PI) / Vd;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Formule de la pression moyenne indiquée',
      formula: 'PMI = (Ci × τ × 2π) / Vd',
      substitution: `PMI = (${Ci} × ${tau} × 2π) / ${Vd}`,
      result: `PMI = ${PMI.toFixed(2)} Pa`
    }
  ] : [];

  return {
    value: PMI,
    unit: 'Pa',
    steps,
    interpretation: `Une PMI de ${(PMI / 1e5).toFixed(2)} bar représente la pression théorique développée dans le cylindre.`
  };
}

export function calculatePMF(params: EngineParams, showSteps = false): CalculationResult {
  let PMI: number;
  let PME: number;

  if (params.PMI && params.PME) {
    PMI = params.PMI;
    PME = params.PME;
  } else {
    PMI = calculatePMI(params).value;
    PME = calculatePME(params).value;
  }

  const PMF = PMI - PME;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Formule de la pression moyenne de frottement',
      formula: 'PMF = PMI - PME',
      substitution: `PMF = ${PMI.toFixed(2)} - ${PME.toFixed(2)}`,
      result: `PMF = ${PMF.toFixed(2)} Pa`
    }
  ] : [];

  return {
    value: PMF,
    unit: 'Pa',
    steps,
    interpretation: `Une PMF de ${(PMF / 1e5).toFixed(2)} bar représente les pertes par frottements mécaniques.`
  };
}

export function calculatePMEFromPe(params: EngineParams, showSteps = false): CalculationResult {
  const { Pe, Vd, N } = params;

  if (!Pe || !Vd || !N) {
    throw new Error('Pe, Vd et N sont requis pour calculer PME');
  }

  // Formule pour 4 temps : PME = (Pe * 120) / (Vd * N)
  const PME = (Pe * 120) / (Vd * N);

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Formule PME via Pe (4 temps)',
      formula: 'PME = (Pe × 120) / (Vd × N)',
      substitution: `PME = (${Pe} × 120) / (${Vd} × ${N})`,
      result: `PME = ${PME.toFixed(2)} Pa`
    }
  ] : [];

  return {
    value: PME,
    unit: 'Pa',
    steps,
    interpretation: `Une PME de ${(PME / 1e5).toFixed(2)} bar est nécessaire pour fournir cette puissance.`
  };
}
