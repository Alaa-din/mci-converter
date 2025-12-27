import { calculatePME, calculatePMI } from './lib/mci/pressures';

const params = {
    Ce: 150, // N.m
    Vd: 0.0016, // m3 (1.6L)
    tau: 2 // 4 temps
};

const pme = calculatePME(params);
console.log(`PME: ${pme.value} Pa`);

const expectedPME = (150 * 2 * 2 * Math.PI) / 0.0016;
console.log(`Expected PME: ${expectedPME} Pa`);

if (Math.abs(pme.value - expectedPME) < 0.01) {
    console.log('PME Calculation: PASS');
} else {
    console.log('PME Calculation: FAIL');
}
