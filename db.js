const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',             // Cambia si usas otro usuario
  password: 'Lapeludita122',    // Cambia si usas otra contraseña
  database: 'postgres',         // Cambia si usas otra base de datos
  port: 5432
});

module.exports = pool;