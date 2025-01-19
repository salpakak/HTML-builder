const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;

  const cssFiles = files.filter((file) => path.extname(file) === '.css');
  let stylesArray = [];

  cssFiles.forEach((file) => {
    fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (err, data) => {
      if (err) throw err;
      stylesArray.push(data);

      if (stylesArray.length === cssFiles.length) {
        const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');
        fs.writeFile(outputPath, stylesArray.join('\n'), (err) => {
          if (err) throw err;
          console.log('CSS merged in bundle.css');
        });
      }
    });
  });
});
