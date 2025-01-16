const fs = require('fs/promises');
const path = require('path');

async function displayFilesInfo() {
  const folderPath = path.join(__dirname, 'secret-folder');

  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const stats = await fs.stat(filePath);
        const fileSizeInKB = stats.size / 1024;
        const fileExtension = path.extname(file.name).slice(1);
        const fileName = path.basename(file.name, path.extname(file.name));

        console.log(`${fileName} - ${fileExtension} - ${fileSizeInKB} kb`);
      }
    }
  } catch (error) {
    console.error('Error reading the folder:', error);
  }
}

displayFilesInfo();
