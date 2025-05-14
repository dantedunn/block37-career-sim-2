const pg = require('pg');
const { Client } = pg
const client = new Client({
    user: 'postgres',
    password: 'password1',
    host: 'localhost',
    port: 5432,
    database: 'block37',
})

module.exports = {
    query: (text, params) => client.query(text, params),
};
