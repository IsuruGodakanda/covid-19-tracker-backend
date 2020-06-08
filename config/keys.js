const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoURI: `mongodb://${process.env.EC2_PRIVATE_IP}:27017/covid-19-tracker`,
  encryptionKey: process.env.ENCRYPTION_KEY,
  port: process.env.PORT
};
