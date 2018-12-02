const hasMatchingCharacterOccurrenceCount = (boxId, count) => {
    const occurrences = [...boxId].reduce((occurrences, character) => {
        if (occurrences[character]) {
            occurrences[character] += 1;
        } else {
            occurrences[character] = 1;
        }
        return occurrences;
    }, {});

    for (let occurrence in occurrences) {
        if (occurrences[occurrence] === count) {
            return true;
        }
    }

    return false;
};

const checksumForBoxIds = (boxIds) => {
    return boxIds.filter(boxId => hasMatchingCharacterOccurrenceCount(boxId, 2)).length *
        boxIds.filter(boxId => hasMatchingCharacterOccurrenceCount(boxId, 3)).length
};

const levenshteinDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    let i; let j;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
                                        Math.min(matrix[i][j - 1] + 1,
                                                 matrix[i - 1][j] + 1));
            }
        }
    }

    return matrix[b.length][a.length];
};

const commonCharacters = (a, b) => [...a].reduce((matches, candidate) => {
    let common = '';
    for (let index in a) {
        common += a[index] === b[index] ? a[index] : '';
    }
    return common;
}, '');

const correctCommonCharacters = (boxIds) => {
    const pairs = [];
    for (let i = 0; i < boxIds.length - 1; i++) {
        for (let j = i + 1; j < boxIds.length; j++) {
            pairs.push([boxIds[i], boxIds[j]]);
        }
    }

    const closestPair = pairs.reduce((closestPair, pair) => {
        if (levenshteinDistance(...pair) < levenshteinDistance(...closestPair)) {
            return pair;
        }
        return closestPair;
    }, pairs.length > 0 ? pairs[0] : null);

    return commonCharacters(...closestPair);
};

module.exports = {
    hasMatchingCharacterOccurrenceCount,
    checksumForBoxIds,
    levenshteinDistance,
    commonCharacters
};

const readStdin = () => new Promise(resolve => {
    let input = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', chunk => {
        input += chunk;
    });

    process.stdin.on('end', () => {
        resolve(input);
    });
});

if (require.main === module) {
    readStdin()
        .then(input => {
            console.log(`Checksum: ${checksumForBoxIds(input.split('\n'))}`);
            return input;
        })
        .then(input => {
            console.log(`Correct common characters: ${correctCommonCharacters(input.split('\n'))}`);
        });
}