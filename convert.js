const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const dbMatch = html.match(/const DB = (\{[\s\S]*?\n    \});/);

if (!dbMatch) {
    console.error("Could not find DB in index.html");
    process.exit(1);
}

const dbText = dbMatch[1];
const DB = eval("(" + dbText + ")");

for (const region in DB) {
    for (const category in DB[region]) {
        const arr = DB[region][category];
        arr.forEach((q, idx) => {
            let diff = 'novice';
            if (arr.length > 3) {
                if (idx > arr.length * 0.33) diff = 'intermediate';
                if (idx > arr.length * 0.66) diff = 'expert';
            }
            q.difficulty = diff;
        });
    }
}

if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

fs.writeFileSync('data/questions.json', JSON.stringify(DB, null, 2));
console.log("data/questions.json generated successfully.");
