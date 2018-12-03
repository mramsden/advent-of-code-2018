const claimRegex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

const parseClaim = line => {
    let matches = claimRegex.exec(line);
    if (matches === null || matches.length !== 6) {
        return null;
    }

    return new Claim(...matches.slice(1));
};

class Claim {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.width = parseInt(width);
        this.height = parseInt(height);
    }

    get usedCoordinates() {
        const coordinates = [];
        Array.from({ length: this.width }, (_, i) => this.x + i).forEach(column => {
            Array.from({ length: this.height }, (_, i) => this.y + i).forEach(row => {
                coordinates.push(`${column}x${row}`);
            });
        });
        return coordinates;
    }
}

const overlappedSquareInches = claims => {
    const overlaps = {};
    claims.forEach(claim => {
        claim.usedCoordinates.forEach(coordinates => {
            if (overlaps[coordinates]) {
                overlaps[coordinates] += 1;
                return;
            }
            overlaps[coordinates] = 1;
        })
    });
    return Object.keys(overlaps).reduce((count, key) => overlaps[key] > 1 ? count + 1 : count, 0);
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
    .then(input => input.split('\n'))
    .then(claims => claims.map(claim => parseClaim(claim)))
    .then(claims => console.log(overlappedSquareInches(claims)));
