const express = require('express');
const router = express.Router();
const db = require('../db'); // Importar conexión a la base de datos
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMiddleware');

// Endpoint para registrar un usuario con una contraseña encriptada
router.post('/usuarios/registrar', async (req, res) => {
    const { cedula, nombre, correo, contraseña, rol, telefono, genero, fecha_nacimiento, direccion } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        // Consulta SQL para insertar un nuevo usuario (usando hashedPassword)
        const sql = `INSERT INTO usuarios (cedula, nombre, correo, contraseña, rol, telefono, genero, fecha_nacimiento, direccion)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(sql, [cedula, nombre, correo, hashedPassword, rol, telefono, genero, fecha_nacimiento, direccion]);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
});

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM usuarios');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});

// Obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
});

// Actualizar un usuario por ID
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { cedula, nombre, correo, telefono, genero, fecha_nacimiento, direccion } = req.body;

    try {
        const sql = `UPDATE usuarios SET cedula = ?, nombre = ?, correo = ?, telefono = ?, genero = ?, fecha_nacimiento = ?, direccion = ? WHERE id = ?`;
        const [result] = await db.query(sql, [cedula, nombre, correo, telefono, genero, fecha_nacimiento, direccion, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
});

// Eliminar un usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
});

// Inicio de sesión
router.post('/usuarios/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        // Buscar al usuario por su correo
        const [result] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuario = result[0];

        // Comparar la contraseña
        const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, 'tu_secreto_jwt', { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error("Error en inicio de sesión:", error);
        res.status(500).json({ message: 'Error en inicio de sesión', error });
    }
});

module.exports = router;

