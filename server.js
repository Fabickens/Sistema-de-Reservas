const express = require('express');
const app = express();
const db = require('./db'); //Importar la conexion a MySQL
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });

//Ruta que funciona para el registro de usuarios
app.post('/usuarios', (req, res) => {
    const {cedula, nombre, correo, contraseña, rol, telefono, especialidad} = req.body;
//Esta es la consulta utilizada para insertar usuarios nuevos
    const sql = `INSERT INTO usuarios (cedula, nombre, correo, contraseña, rol, telefono, especialidad) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [cedula, nombre, correo, contraseña, rol, telefono, especialidad], (err, result) => {
        if(err) {
            return res.status(500).send('Error registrando el usuario');
        }
        res.status(201).send('Usuario registrado exitosamente');
    });
});

//Ruta que funciona como inicio de sesión
app.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;
  
    if (!correo || !contraseña) {
      return res.status(400).send('Correo y contraseña son requeridos');
    }
  
    const sql = `SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?`;
  
    db.query(sql, [correo, contraseña], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }
  
        if (results.length === 0) {
            return res.status(401).send('Correo o contraseña incorrectos');
        }
  
      res.send('Inicio de sesión exitoso');
    });
});
  

//Ruta que funciona para obtener los datos de un usuario
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM usuarios WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send('Error obteniendo el usuario');
        }

        if (result.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(result[0]);
    });
});

//Ruta que funciona para actualizar los datos de un usuario
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { cedula, nombre, correo, telefono, especialidad } = req.body;
  
    const sql = `UPDATE usuarios SET cedula = ?, nombre = ?, correo = ?, telefono = ?, especialidad = ? WHERE id = ?`;
  
    db.query(sql, [cedula, nombre, correo, telefono, especialidad, id], (err, result) => {
        if (err) {
            return res.status(500).send('Error actualizando el usuario');
        }
        res.send('Usuario actualizado exitosamente');
    });
});

//Ruta que funciona para eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
  
    const sql = `DELETE FROM usuarios WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send('Error eliminando el usuario');
        }
  
      res.send('Usuario eliminado exitosamente');
    });
});

//Empiezan las APIs para las citas
// Ruta que funciona para crear las citas
app.post('/citas', (req, res) => {
    const{ fecha, estado, tipo, id_paciente, id_doctor } = req.body;

    const sql = 'INSERT INTO citas (fecha, estado, tipo, id_paciente, id_doctor) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [fecha, estado, tipo, id_paciente, id_doctor], (err, result) => {
        if (err) {
            return res.status(500).send('Error registrando la cita');
        }
        res.status(201).send('Error registrando la cita');
    });
});

//Ruta que funciona para obtener todas las citas
app.get('/citas', (req, res) => {
    const sql = 'SELECT * FROM citas';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Error obteniendo las citas');
        }
        res.json(results);
    });
});

//Ruta para modificar los detalles de una cita