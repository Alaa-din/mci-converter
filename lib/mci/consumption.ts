import { EngineParams, CalculationResult, CalculationStep } from './types';

export function calculateCo(params: EngineParams, showSteps = false): CalculationResult {
  const { mf } = params;

  if (!mf) {
    throw new Error('mf (débit massique) est requis pour calculer Co');
  }

  const Co = mf * 3600;

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Conversion du débit massique en consommation horaire',
      formula: 'Co = ṁf × 3600',
      substitution: `Co = ${mf} × 3600`,
      result: `Co = ${Co.toFixed(4)} kg/h`
    }
  ] : [];

  return {
    value: Co,
    unit: 'kg/h',
    steps,
    interpretation: `Le moteur consomme ${Co.toFixed(2)} kg de carburant par heure de fonctionnement.`
  };
}

export function calculateCs(params: EngineParams, showSteps = false): CalculationResult {
  const { mf, Pe } = params;

  if (!mf || !Pe) {
    throw new Error('mf et Pe sont requis pour calculer Cs');
  }

  const Cs = (mf * 3600 * 1000) / (Pe / 1000);

  const steps: CalculationStep[] = showSteps ? [
    {
      description: 'Conversion de la puissance en kW',
      formula: 'Pe_kW = Pe / 1000',
      substitution: `Pe_kW = ${Pe} / 1000`,
      result: `Pe_kW = ${(Pe/1000).toFixed(2)} kW`
    },
    {
      description: 'Calcul de la consommation spécifique',
      formula: 'Cs = (ṁf × 3600 × 1000) / Pe_kW',
      substitution: `Cs = (${mf} × 3600 × 1000) / ${(Pe/1000).toFixed(2)}`,
      result: `Cs = ${Cs.toFixed(2)} g/kWh`
    }
  ] : [];

  return {
    value: Cs,
    unit: 'g/kWh',
    steps,
    interpretation: `Une consommation spécifique de ${Cs.toFixed(2)} g/kWh indique l'efficacité du moteur. Les moteurs modernes visent 200-250 g/kWh.`
  };
}
