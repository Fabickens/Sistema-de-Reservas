const express = require('express');
const router = express.Router();
const db = require('../db'); // Conexión a la base de datos
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../config/cloudinary');
const fs = require('fs');


// Registrar un nuevo doctor
router.post('/doctores/registrar', async (req, res) => {
    const { nombre, correo, contraseña, experiencia, acerca, precio, direccion } = req.body;

    try {
        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        // Insertar en la base de datos
        const sql = `
            INSERT INTO doctores (nombre, correo, contraseña, experiencia, acerca, precio, direccion)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [nombre, correo, hashedPassword, experiencia, acerca, precio, direccion]);

        res.status(201).json({ message: 'Doctor registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar doctor:', error);
        res.status(500).json({ message: 'Error al registrar doctor.', error });
    }
});

//Obtener todos los doctores
router.get('/doctores', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM doctores');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener doctores:', error);
        res.status(500).json({ message: 'Error al obtener doctores.', error });
    }
});

//Obtener doctores por id
router.get('/doctores/:id', async (req, res) => {
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

//Editar doctores por id
router.put('/doctores/:id', async (req, res) => {
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

module.exports = router;
