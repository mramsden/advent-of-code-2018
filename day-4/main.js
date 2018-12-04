const timestampRegex = /^\[(.*)\]/;
const shiftRegex = /^\[(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})\] (.*)/;
const guardRegex = /^Guard #(\d+)/;

const sortedShifts = shifts => shifts.sort((a, b) => {
    const timeA = timestampRegex.exec(a)[1];
    const timeB = timestampRegex.exec(b)[1];
    return (timeA < timeB) ? -1 : (timeA > timeB) ? 1 : 0;
});

const groupGuardShifts = shifts => {
    let currentGuard;
    let currentMinute;
    let currentShift;
    const guardShifts = {};
    shifts.forEach(shift => {
        const [_, __, ___, minute, message] = shiftRegex.exec(shift);
        if (currentGuard && message === 'wakes up') {
            currentShift.fill('#', currentMinute, minute);
        } else if (currentGuard && message === 'falls asleep') {
            currentShift.fill('.', currentMinute, minute);
        } else if (message.startsWith('Guard')) {
            const [_, guardId] = guardRegex.exec(message);
            currentGuard = guardId;
            if (guardShifts[guardId] === undefined) {
                guardShifts[guardId] = [];
            }
            currentShift = Array.from({ length: 60 }).fill('.');
            guardShifts[guardId].push(currentShift);
        }
        currentMinute = minute;
    });
    return guardShifts;
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

readStdin()
    .then(shifts => shifts.split('\n'))
    .then(shifts => sortedShifts(shifts))
    .then(shifts => {
        let targetGuard;
        let targetSleepTime;
        const groupedShifts = groupGuardShifts(shifts);
        
        for (let guardId in groupedShifts) {
            const sleepTime = groupedShifts[guardId].reduce((count, shift) =>
                count + (shift.join('').match(/#/g) || []).length
            , 0);
            if (sleepTime > (targetSleepTime || 0)) {
                targetGuard = guardId;
                targetSleepTime = sleepTime;
            }
        }

        let targetTime;
        let overlaps;
        for (var minute = 0; minute < 60; minute++) {
            const count = groupedShifts[targetGuard].reduce((count, shift) => {
                return count + (shift[minute] === '#' ? 1 : 0);
            }, 0);
            if (count > (overlaps || 0)) {
                targetTime = minute;
                overlaps = count;
            }
        }
        console.log(`Target Guard: ${targetGuard} Target Time: ${targetTime}`);
    });
