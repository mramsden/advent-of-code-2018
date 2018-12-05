const types = ['aA','bB','cC','dD','eE','fF','gG','hH','iI','jJ','kK','lL','mM','nN','oO','pP','qQ','rR','sS','tT','uU','vV','wW','xX','yY','zZ'];

const reducePolymer = polymer => {
    let unchanged = false;
    while (!unchanged) {
        const lengthBefore = polymer.length;
        for (let i = 0; i < types.length; i++) {
            const pair = types[i];
            const reversedPair = pair.split('').reverse().join('');
            polymer = polymer.replace(pair, '');
            polymer = polymer.replace(reversedPair, '');
        }
        unchanged = polymer.length === lengthBefore;
    }
    return polymer;
};

const removeType = (polymer, type) => polymer.replace(new RegExp(`[${type}]`, 'g'), '');

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
    .then(polymer => {
        console.log(`Reduced Polymer Length: ${reducePolymer(polymer).length}`);
        const results = types.map(type => {
            const strippedTypePolymer = removeType(polymer, type);
            return `${reducePolymer(strippedTypePolymer).length}: ${type}`;
        });
        console.log(results.sort());
    });
