const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Conexión a la base de datos
const router = express.Router();

router.post('/administradores/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const [result] = await db.query('SELECT * FROM administradores WHERE correo = ?', [correo]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        const administrador = result[0];

        const validPassword = await bcrypt.compare(contraseña, administrador.contraseña);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token con datos de administrador
        const token = jwt.sign({ id: administrador.id, nombre: administrador.nombre, rol:'administrador' }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión como administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Endpoint para registrar un administrador con una contraseña encriptada
router.post('/administradores/registrar', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        // Consulta SQL para insertar un nuevo usuario (usando hashedPassword)z
        const sql = `INSERT INTO administradores (nombre, correo, contraseña)
                     VALUES (?, ?, ?)`;

        await db.query(sql, [ nombre, correo, hashedPassword]);
        res.status(201).json({ message: 'Administrador registrado exitosamente' });
    } catch (error) {
        console.error("Error al registrar administrador:", error);
        res.status(500).json({ message: 'Error al registrar administrador', error });
    }
});


module.exports = router;
