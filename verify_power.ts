import { calculatePeFromPME } from './lib/mci/powers';

const params = {
    PME: 1000000, // 10 bar in Pa
    Vd: 0.002, // 2.0 L in m3
    N: 3000 // rpm
};

try {
    const result = calculatePeFromPME(params);
    console.log(`Pe: ${result.value} W`);

    const expectedPe = (1000000 * 0.002 * 3000) / 120;
    console.log(`Expected Pe: ${expectedPe} W`);

    if (Math.abs(result.value - expectedPe) < 0.01) {
        console.log('Pe from PME Calculation: PASS');
    } else {
        console.log('Pe from PME Calculation: FAIL');
    }
} catch (e: any) {
    console.error(e.message);
}
