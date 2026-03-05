const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src', 'app'));
const regex = /\s*<span className="inline-block py-1 px-3 rounded-full bg-white\/10 backdrop-blur-md border border-white\/20 text-sm font-medium mb-4">\s*[\s\S]*?<\/span>/g;

let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log('Modified:', file);
  }
});
console.log('Total files modified:', count);
