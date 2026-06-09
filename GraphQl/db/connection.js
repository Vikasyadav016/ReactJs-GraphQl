const fs = require('fs');
const path = require('path');
const { paths } = require('../config/config');

function ensureFile(filePath, initialValue = '[]') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, initialValue, 'utf8');
  }
}

function readJson(fileName) {
  const filePath = path.join(paths.dataFolder, fileName);
  ensureFile(filePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function writeJson(fileName, data) {
  const filePath = path.join(paths.dataFolder, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  readJson,
  writeJson,
};
