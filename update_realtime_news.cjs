const fs = require('fs');

let content = fs.readFileSync('src/components/NaverLandNews.tsx', 'utf-8');

// Ensure we have current time state and live ticker
console.log('Read NaverLandNews.tsx successfully, length:', content.length);
