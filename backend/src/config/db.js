const { Pool } = require("pg");
require('dotenv').config();

console.log("DB URL:", process.env.DB_URL);

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.query('SELECT NOW()')
  .then(res => console.log(res.rows))
  .catch(err => console.error(err));

module.exports = pool;