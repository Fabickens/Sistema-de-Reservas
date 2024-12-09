const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'malparidos20', // Cambia esto por tu contraseña de MySQL
    database: 'proyecto_graduacion',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise(); // Exportamos el pool como promesa para usar async/await
