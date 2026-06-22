const fs = require('fs');
const text = fs.readFileSync('C:/Users/Radhe Krishn/.gemini/antigravity/brain/8459ebfb-0b1b-4cab-8234-d5d1a80dcb5d/.system_generated/steps/1111/content.md', 'utf8');

const lower = text.toLowerCase();
const idx1 = lower.indexOf('numberwale');
if (idx1 !== -1) console.log('Found Numberwale:', text.substring(idx1 - 200, idx1 + 1000));

const idx2 = lower.indexOf('i am kartik');
if (idx2 !== -1) console.log('Found I am Kartik:', text.substring(idx2 - 200, idx2 + 1000));

const idx3 = lower.indexOf('about me');
if (idx3 !== -1) console.log('Found about me:', text.substring(idx3 - 200, idx3 + 1000));
