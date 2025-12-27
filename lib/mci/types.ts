export interface EngineParams {
  Pe?: number;
  Pi?: number;
  Ce?: number;
  Ci?: number;
  N?: number;
  Vd?: number;
  mf?: number;
  PCI?: number;
  Z?: number;
  tau?: number;
  PME?: number;
  PMI?: number;
  PMF?: number;
  etaMeca?: number;
  etaThermiqueInd?: number;
  etaThermiqueEff?: number;
  Co?: number;
  Cs?: number;
}

export interface CalculationStep {
  description: string;
  formula: string;
  substitution: string;
  result: string;
}

export interface CalculationResult {
  value: number;
  unit: string;
  steps?: CalculationStep[];
  interpretation?: string;
}
