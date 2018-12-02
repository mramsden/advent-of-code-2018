const assert = require('assert');
const { hasMatchingCharacterOccurrenceCount, checksumForBoxIds, levenshteinDistance, commonCharacters } = require('./main');

assert(hasMatchingCharacterOccurrenceCount('abcdef', 2) === false);
assert(hasMatchingCharacterOccurrenceCount('bababc', 2) === true);
assert(hasMatchingCharacterOccurrenceCount('bababc', 3) === true);
assert(hasMatchingCharacterOccurrenceCount('abbcde', 2) === true);
assert(hasMatchingCharacterOccurrenceCount('abcccd', 2) === false);
assert(hasMatchingCharacterOccurrenceCount('abcccd', 3) === true);
assert(hasMatchingCharacterOccurrenceCount('aabcdd', 2) === true);

assert(checksumForBoxIds(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']) === 12);

assert(levenshteinDistance('abcde', 'axcye') === 2);
assert(levenshteinDistance('fghij', 'fguij') === 1);

assert(commonCharacters('fghij', 'fguij') === 'fgij');

console.log('Tests passed');