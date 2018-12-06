const split = origin => origin.split(',');

const distanceBetween = (a, b) => {
    const horizontal = Math.max(a[0], b[0]) - Math.min(a[0], b[0]);
    const vertical = Math.max(a[1], b[1]) - Math.min(a[1], b[1]);
    return horizontal + vertical;
}

class Grid {
    constructor(origins) {
        this.width = origins.map(origin => parseInt(split(origin)[0]))
            .reduce((maxX, x) => x > maxX ? x : maxX, 0);
        this.height = origins.map(origin => parseInt(split(origin)[1]))
            .reduce((maxY, y) => y > maxY ? y : maxY, 0);
        this.origins = origins.map(origin => origin.replace(/ /g, ''));
    }

    get largestZoneSize() {
        const zoneSizes = this.origins.reduce((zoneSizes, origin) => {
            zoneSizes[origin] = 0;
            return zoneSizes;
        }, {});
        const origins = this.origins.map(origin => split(origin));
        let infiniteOrigins = [];
        for (let currentY = 0; currentY < this.height; currentY++) {
            for (let currentX = 0; currentX < this.width; currentX++) {
                const current = [currentX, currentY];
                let closestOrigin;
                let closestDistance = Number.MAX_SAFE_INTEGER;
                origins.forEach(origin => {
                    const distance = distanceBetween(current, origin);
                    if (distance === closestDistance) {
                        closestOrigin = null;
                        return;
                    }
                    if (distance < closestDistance) {
                        closestOrigin = origin.join(',');
                        closestDistance = distance;
                    }
                });

                if (closestOrigin === null) { continue; }
                if (currentY === 0 || currentX === 0 || currentY === this.height - 1 || currentX === this.width - 1) {
                    infiniteOrigins.push(closestOrigin);
                }
                zoneSizes[closestOrigin] += 1;
            }
        }

        let largestZoneSize = 0;
        Object.keys(zoneSizes).forEach(origin => {
            if (zoneSizes[origin] > largestZoneSize && !infiniteOrigins.includes(origin)) {
                largestZoneSize = zoneSizes[origin];
            }
        });

        return largestZoneSize;
    }

    safeRegionSize(maxDistance) {
        let safeSize = 0;
        const origins = this.origins.map(origin => split(origin));
        for (let currentY = 0; currentY < this.width; currentY++) {
            for (let currentX = 0; currentX < this.height; currentX++) {
                const current = [currentX, currentY];
                const totalDistance = origins
                    .map(origin => distanceBetween(current, origin))
                    .reduce((a, b) => a + b, 0);
                if (totalDistance < maxDistance) {
                    safeSize += 1;
                }
            }
        }
        return safeSize;
    }
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

readStdin()
    .then(input => input.split('\n'))
    .then(input => new Grid(input))
    .then(grid => {
        console.log(`Largest Zone: ${grid.largestZoneSize}`);
        console.log(`Safe Zone Size: ${grid.safeRegionSize(10000)}`);
    });
