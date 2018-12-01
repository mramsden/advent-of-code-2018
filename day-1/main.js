const calculateFrequency = (currentFrequency, change) => {
    if (change.charAt(0) === '+') {
        const changeValue = parseInt(change.slice(1));
        return currentFrequency + parseInt(changeValue);
    }
    if (change.charAt(0) === '-') {
        const changeValue = parseInt(change.slice(1));
        return currentFrequency - parseInt(changeValue);
    }
    return currentFrequency;
};

const calculateFrequencyDrift = (readings) =>
    readings.split('\n').reduce((currentDrift, change) => {
        return calculateFrequency(currentDrift, change.trim());
    }, 0);

class ChangeStream {

    constructor(readings) {
        this.changes = readings.split('\n');
    }

    next() {
        const position = this.position || 0;
        if (position + 1 < this.changes.length) {
            this.position = position + 1;
        } else {
            this.position = 0;
        }
        return this.changes[position];
    }

}

const calibratedFrequency = (readings) => {
    const observedFrequencies = {
        0: true
    };
    const stream = new ChangeStream(readings);
    let change;
    let currentFrequency;
    while (change = stream.next()) {
        currentFrequency = calculateFrequency(currentFrequency || 0, change);
        if (observedFrequencies[currentFrequency] === true) {
            break;
        }
        observedFrequencies[currentFrequency] = true;
    }

    return currentFrequency;
};

module.exports = {
    calculateFrequency,
    calculateFrequencyDrift,
    calibratedFrequency
};

if (require.main !== module) {
    return;
}

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

readStdin().then(input => console.log(calibratedFrequency(input)));
