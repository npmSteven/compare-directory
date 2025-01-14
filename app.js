const fs = require('fs/promises');

async function checkFileExists(file) {
  try {
    await fs.access(file, fs.constants.F_OK)
  } catch (error) {
    return false
  }
  return true;
}

const sourcePath = process.argv[2];
const comparePath = process.argv[3];

async function init() {
  try {
    const [
      doesSourcePathExist, doesComparePathExist
    ] = await Promise.all([
      checkFileExists(sourcePath),
      checkFileExists(comparePath),
    ]);
    if (!doesSourcePathExist || !doesComparePathExist) {
      throw new Error('One of the paths does not exist');
    }
    const [
      sourceFiles,
      compareFiles,
    ] = await Promise.all([
      fs.readdir(sourcePath),
      fs.readdir(comparePath)
    ]);
    console.log(`Checking if there are files in the source`);
    console.log(`source files ${sourceFiles.length} compare files ${compareFiles.length}`)
    const notFoundFiles = compareFiles.find(cf => !sourceFiles.includes(cf));
    console.log(notFoundFiles);

  } catch (error) {
    console.error('ERROR - init():', error);
    process.exit(1);
  }
}

init();
