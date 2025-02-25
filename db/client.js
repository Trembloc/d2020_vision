const { Client } = require('pg');
const client = new Client('postgres://postgres:Pepper12%@localhost:5432/d2020_vision');

module.exports = client;