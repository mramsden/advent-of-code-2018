const assert = require('assert');
const { calculateFrequency, calculateFrequencyDrift, calibratedFrequency } = require('./main');

// Current frequency 0, change of +1; resulting frequency 1.
assert(calculateFrequency(0, '+1') === 1);

// Current frequency 1, change of -2; resulting frequency -1.
assert(calculateFrequency(1, '-2') === -1);

// Current frequency -1, change of +3; resulting frequency 2.
assert(calculateFrequency(-1, '+3') === 2);

// Current frequency 2, change of +1; resulting frequency 3.
assert(calculateFrequency(2, '+1') === 3);

// '+1\n+1\n+1' results in 3
assert(calculateFrequencyDrift('+1\n+1\n+1') === 3);

// '-1\n-1\n+2' results in 0
assert(calculateFrequencyDrift('-1\n-1\n+2') === 0);

// '-1\n-2\n-3' results in -6
assert(calculateFrequencyDrift('-1\n-2\n-3') === -6);

// '+1\n-1' results in 3
assert(calibratedFrequency('+1\n-1') === 0);

// '+3\n+3\n+4\n-2\-4' results in 10
assert(calibratedFrequency('+3\n+3\n+4\n-2\n-4') === 10);

// '-6\n+3\n+8\n+5\n-6' results in 5
assert(calibratedFrequency('-6\n+3\n+8\n+5\n-6') === 5);

// '+7\n+7\n-2\n-7\n-4' results in 14
assert(calibratedFrequency('+7\n+7\n-2\n-7\n-4') === 14);

console.log('Tests passed');
