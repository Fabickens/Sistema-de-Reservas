const express = require('express');
const router = express.Router();
const db = require('../db'); // Conexión a la base de datos
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Endpoint para registrar doctores con imagen
router.post('/doctores/registrar', async (req, res) => {
    const { nombre, correo, contraseña, especialidad, experiencia, acerca, precio, direccion } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const sql = `
            INSERT INTO doctores (nombre, correo, contraseña, especialidad, experiencia, acerca, precio, direccion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [nombre, correo, hashedPassword, especialidad, experiencia, acerca, precio, direccion]);
        res.status(201).json({ message: 'Doctor registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar doctor:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

//Obtener todos los doctores
router.get('/doctores', async (req, res) => {
    try {
        const sql = 'SELECT * FROM doctores'
        const [result] = await db.query(sql);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener doctores:', error);
        res.status(500).json({ message: 'Error al obtener doctores.', error });
    }
});

router.get('/doctores/perfil', authenticateToken, async (req, res) => {
    const doctorId = req.user.id; // ID del doctor autenticado

    try {
        const sql = `
            SELECT id, nombre, correo, especialidad, experiencia, acerca, precio, direccion
            FROM doctores
            WHERE id = ?
        `;

        const [doctor] = await db.query(sql, [doctorId]);

        if (doctor.length === 0) {
            return res.status(404).json({ message: 'Doctor no encontrado.' });
        }

        res.status(200).json(doctor[0]);
    } catch (error) {
        console.error('Error al obtener perfil del doctor:', error);
        res.status(500).json({ message: 'Error al obtener perfil del doctor.', error });
    }
});



//Obtener doctores por id
router.get('/doctores/id/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM doctores WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Doctor no encontrado.' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error al obtener doctor:', error);
        res.status(500).json({ message: 'Error al obtener doctor.', error });
    }
});

router.put('/doctores/perfil', authenticateToken, async (req, res) => {
    const doctorId = req.user.id;
    const { nombre, especialidad, experiencia, acerca, precio, direccion } = req.body;

    try {
        const sql = `
            UPDATE doctores
            SET nombre = ?, especialidad = ?, experiencia = ?, acerca = ?, precio = ?, direccion = ?
            WHERE id = ?
        `;

        const [result] = await db.query(sql, [
            nombre,
            especialidad,
            experiencia,
            acerca,
            precio,
            direccion,
            doctorId,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor no encontrado o no actualizado.' });
        }

        res.status(200).json({ message: 'Perfil actualizado exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar perfil del doctor:', error);
        res.status(500).json({ message: 'Error al actualizar perfil del doctor.', error });
    }
});




//Editar doctores por id
router.put('/doctores/id/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen, experiencia, acerca, precio, direccion } = req.body;

    try {
        const sql = `
            UPDATE doctores
            SET nombre = ?, imagen = ?, experiencia = ?, acerca = ?, precio = ?, direccion = ?
            WHERE id = ?
        `;
        await db.query(sql, [nombre, imagen, experiencia, acerca, precio, direccion, id]);
        res.status(200).json({ message: 'Doctor actualizado exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar doctor:', error);
        res.status(500).json({ message: 'Error al actualizar doctor.', error });
    }
});

// Eliminar un doctor por ID
router.delete('/doctores/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM doctores WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        res.status(200).json({ message: 'Doctor eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar doctor:", error);
        res.status(500).json({ message: 'Error al eliminar doctor', error });
    }
});

router.get('/especialidades', async (req, res) => {
    try {
        const sql = `SELECT DISTINCT especialidad FROM doctores WHERE especialidad IS NOT NULL AND especialidad != ''`;
        const [result] = await db.query(sql);
        res.status(200).json(result.map(row => row.especialidad));
    } catch (error) {
        console.error('Error al obtener especialidades:', error);
        res.status(500).json({ message: 'Error al obtener especialidades.', error });
    }
});

router.post('/doctores/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const [result] = await db.query('SELECT * FROM doctores WHERE correo = ?', [correo]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }

        const doctor = result[0];

        const validPassword = await bcrypt.compare(contraseña, doctor.contraseña);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token con datos de administrador
        const token = jwt.sign({ id: doctor.id, nombre: doctor.nombre, rol: 'doctor' }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión como doctor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});




module.exports = router;
