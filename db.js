const mysql = require('mysql2');

// Crear conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambie esto por su usuario de MySQL
  password: 'su contraseña', // Cambie esto por su contraseña de MySQL
  database: 'sistema_reservas'
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
