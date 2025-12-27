import { calculatePMEFromPe } from './lib/mci/pressures';

const params = {
    Pe: 50000, // 50 kW in W
    Vd: 0.002, // 2.0 L in m3
    N: 3000 // rpm
};

try {
    const result = calculatePMEFromPe(params);
    console.log(`PME: ${result.value} Pa`);

    const expectedPME = (50000 * 120) / (0.002 * 3000);
    console.log(`Expected PME: ${expectedPME} Pa`);

    if (Math.abs(result.value - expectedPME) < 1) {
        console.log('PME from Pe Calculation: PASS');
    } else {
        console.log('PME from Pe Calculation: FAIL');
    }
} catch (e: any) {
    console.error(e.message);
}
