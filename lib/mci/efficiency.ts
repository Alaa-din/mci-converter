import { EngineParams, CalculationResult, CalculationStep } from './types';

export function calculateRendementMecanique(params: EngineParams, showSteps = false): CalculationResult {
  const { Pe, Pi } = params;

  if (!Pe || !Pi) {
    throw new Error('Pe et Pi sont requis pour calculer le rendement mécanique');
  }

  const etaMeca = Pe / Pi;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Formule du rendement mécanique',
      formula: 'ηm = Pe / Pi',
      substitution: `ηm = ${Pe} / ${Pi}`,
      result: `ηm = ${etaMeca.toFixed(4)} (${(etaMeca * 100).toFixed(2)}%)`
    }
  ] : [];

  return {
    value: etaMeca,
    unit: '',
    steps,
    interpretation: `Un rendement mécanique de ${(etaMeca * 100).toFixed(1)}% indique que ${((1-etaMeca) * 100).toFixed(1)}% de la puissance indiquée est perdue par frottements.`
  };
}

export function calculateRendementThermiqueIndique(params: EngineParams, showSteps = false): CalculationResult {
  const { Pi, mf, PCI } = params;

  if (!Pi || !mf || !PCI) {
    throw new Error('Pi, mf et PCI sont requis pour calculer le rendement thermique indiqué');
  }

  const Pcomb = mf * PCI;
  const etaThermiqueInd = Pi / Pcomb;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Calcul de la puissance de combustion',
      formula: 'Pcomb = ṁf × PCI',
      substitution: `Pcomb = ${mf} × ${PCI}`,
      result: `Pcomb = ${Pcomb.toFixed(2)} W`
    },
    {
      description: 'Calcul du rendement thermique indiqué',
      formula: 'ηthi = Pi / Pcomb',
      substitution: `ηthi = ${Pi} / ${Pcomb.toFixed(2)}`,
      result: `ηthi = ${etaThermiqueInd.toFixed(4)} (${(etaThermiqueInd * 100).toFixed(2)}%)`
    }
  ] : [];

  return {
    value: etaThermiqueInd,
    unit: '',
    steps,
    interpretation: `Un rendement thermique indiqué de ${(etaThermiqueInd * 100).toFixed(1)}% représente l'efficacité de conversion de l'énergie chimique en travail indiqué.`
  };
}

export function calculateRendementThermiqueEffectif(params: EngineParams, showSteps = false): CalculationResult {
  const { Pe, mf, PCI } = params;

  if (!Pe || !mf || !PCI) {
    throw new Error('Pe, mf et PCI sont requis pour calculer le rendement thermique effectif');
  }

  const Pcomb = mf * PCI;
  const etaThermiqueEff = Pe / Pcomb;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Calcul de la puissance de combustion',
      formula: 'Pcomb = ṁf × PCI',
      substitution: `Pcomb = ${mf} × ${PCI}`,
      result: `Pcomb = ${Pcomb.toFixed(2)} W`
    },
    {
      description: 'Calcul du rendement thermique effectif',
      formula: 'ηthe = Pe / Pcomb',
      substitution: `ηthe = ${Pe} / ${Pcomb.toFixed(2)}`,
      result: `ηthe = ${etaThermiqueEff.toFixed(4)} (${(etaThermiqueEff * 100).toFixed(2)}%)`
    }
  ] : [];

  return {
    value: etaThermiqueEff,
    unit: '',
    steps,
    interpretation: `Un rendement thermique effectif de ${(etaThermiqueEff * 100).toFixed(1)}% représente l'efficacité globale du moteur. Les moteurs essence atteignent 25-30%, les diesel 35-45%.`
  };
}
