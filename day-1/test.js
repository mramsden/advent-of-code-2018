const assert = require('assert');
const { calculateFrequency } = require('./main');

// Current frequency 0, change of +1; resulting frequency 1.
assert(calculateFrequency(0, '+1') === 1);
// Current frequency 1, change of -2; resulting frequency -1.
assert(calculateFrequency(1, '-2') === -1);
// Current frequency -1, change of +3; resulting frequency 2.
assert(calculateFrequency(-1, '+3') === 2);
// Current frequency 2, change of +1; resulting frequency 3.
assert(calculateFrequency(2, '+1') === 3);

console.log('Tests passed');
