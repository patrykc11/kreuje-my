const fs = require('fs');
const path = require('path');

const projectsDir = path.join(process.cwd(), 'public', 'projekty');
const outputFile = path.join(process.cwd(), 'public', 'projects.json');

function generateProjectsList() {
  try {
    console.log('Generating projects list...');
    console.log('Reading from:', projectsDir);
    
    if (!fs.existsSync(projectsDir)) {
      console.error('Projects directory does not exist:', projectsDir);
      fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
      return;
    }

    const folders = fs.readdirSync(projectsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort((a, b) => {
        // Sort by number prefix if present, otherwise alphabetically
        const numA = parseInt(a.match(/^\d+\.?\s*/)?.[0] || '999');
        const numB = parseInt(b.match(/^\d+\.?\s*/)?.[0] || '999');
        if (numA !== 999 || numB !== 999) {
          return numA - numB;
        }
        return a.localeCompare(b);
      });

    const projects = [];

    for (const folderName of folders) {
      const folderPath = path.join(projectsDir, folderName);
      const files = fs.readdirSync(folderPath)
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        })
        .sort()
        .map(filename => ({
          filename,
          path: `/projekty/${encodeURIComponent(folderName)}/${encodeURIComponent(filename)}`
        }));

      if (files.length > 0) {
        projects.push({
          name: folderName.replace(/^\d+\.?\s*/, ''), // Remove number prefix for display
          folderName,
          images: files
        });
      }
    }

    fs.writeFileSync(outputFile, JSON.stringify(projects, null, 2));
    console.log(`✅ Generated projects list with ${projects.length} projects`);
    console.log('Output file:', outputFile);
  } catch (error) {
    console.error('Error generating projects list:', error);
    // Write empty array to prevent build failures
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
    process.exit(1);
  }
}

generateProjectsList();

