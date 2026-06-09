const path = require('path');

require('dotenv').config();

module.exports = {
  server: {
    port: parseInt(process.env.PORT, 10) || 4000,
  },
  paths: {
    dataFolder: path.join(__dirname, '..', 'data'),
  },
};
