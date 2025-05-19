require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => {
    console.log('Connected to the database!');
    return client.end();
  })
  .catch(err => {
    console.error('Connection error:', err.stack);
    client.end();
  });