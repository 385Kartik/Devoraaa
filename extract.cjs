const fs = require('fs');
const content = fs.readFileSync('portfolio.js', 'utf8');
const regex = /title:\s*["']([^"']+)["'],\s*description:\s*["']([^"']+)["']/g;
let match;
const projects = [];
while ((match = regex.exec(content)) !== null) {
  projects.push({ title: match[1], description: match[2] });
}
if (projects.length === 0) {
  // Let's try matching strings like {title:"...",description:"..."} or similar if properties don't have quotes
  const altRegex = /title:"([^"]+)",description:"([^"]+)"/g;
  while ((match = altRegex.exec(content)) !== null) {
    projects.push({ title: match[1], description: match[2] });
  }
}
console.log(JSON.stringify(projects, null, 2));
