const { Pool } = require('pg');
require('env2')('.env');

if (!process.env.DB_URL) {
  throw new Error(' DATABASE URL have a problems');
}
const connection = new Pool({
  connectionString: process.env.DB_URL,
  ssl: false,
});

module.exports = connection;