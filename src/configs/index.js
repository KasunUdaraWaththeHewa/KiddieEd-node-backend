require('dotenv').config();

const config = {
  DB_CONNECTION_STRING: process.env.MONGODB_URL,
  PORT:process.env.PORT
};

module.exports = config;
