const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear una nueva especialidad
router.post('/especialidades', async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const sql = `INSERT INTO especialidades (nombre, descripcion) VALUES (?, ?)`;
        await db.query(sql, [nombre, descripcion]);
        res.status(201).json({ message: 'Especialidad creada exitosamente' });
    } catch (error) {
        console.error("Error al crear especialidad:", error);
        res.status(500).json({ message: 'Error al crear especialidad', error });
    }
});

// Obtener todas las especialidades
router.get('/especialidades', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM especialidades');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener especialidades:", error);
        res.status(500).json({ message: 'Error al obtener especialidades', error });
    }
});

// Asignar una especialidad a un doctor
router.post('/doctores/:id/especialidades', async (req, res) => {
    const { id } = req.params; // ID del doctor
    const { id_especialidades } = req.body; // Array de IDs de especialidades

    try {
        const sql = `INSERT INTO doctor_especialidad (id_doctor, id_especialidad) VALUES (?, ?)`;
        for (const id_especialidad of id_especialidades) {
            await db.query(sql, [id, id_especialidad]);
        }
        res.status(201).json({ message: 'Especialidades asignadas exitosamente.' });
    } catch (error) {
        console.error('Error al asignar especialidades:', error);
        res.status(500).json({ message: 'Error al asignar especialidades.', error });
    }
});


// Obtener todas las especialidades de un doctor
router.get('/doctores/:id/especialidades', async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
            SELECT e.nombre, e.descripcion
            FROM doctor_especialidad de
            JOIN especialidades e ON de.id_especialidad = e.id
            WHERE de.id_doctor = ?
        `;
        const [result] = await db.query(sql, [id]);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener especialidades del doctor:', error);
        res.status(500).json({ message: 'Error al obtener especialidades del doctor.', error });
    }
});

 module.exports = router;