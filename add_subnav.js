const fs = require('fs');
const path = require('path');

const filePaths = [
  'src/app/donation/page.tsx',
  'src/app/donation/apply/general/page.tsx',
  'src/app/donation/apply/regular/page.tsx',
  'src/app/donation/apply/goods/page.tsx',
  'src/app/donation/apply/sponsorship/page.tsx',
  'src/app/volunteer/page.tsx',
  'src/app/volunteer/apply/page.tsx',
];

filePaths.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  let modified = false;

  // Insert import if missing
  if (!content.includes('import SubMenuNav')) {
    content = content.replace('import Navbar from "@/components/Navbar";', 'import Navbar from "@/components/Navbar";\nimport SubMenuNav from "@/components/SubMenuNav";');
    modified = true;
  }

  const lines = content.split('\n');
  let newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
      newLines.push(lines[i]);
      if (lines[i].includes('<Navbar />')) {
          // Check next line
          if (i + 1 >= lines.length || !lines[i+1].includes('<SubMenuNav />')) {
              const match = lines[i].match(/^(\s*)/);
              const indent = match ? match[1] : '';
              newLines.push(indent + '<SubMenuNav />');
              modified = true;
          }
      }
  }

  if (modified) {
    fs.writeFileSync(fullPath, newLines.join('\n'), 'utf8');
    console.log('Updated', relPath);
  }
});
