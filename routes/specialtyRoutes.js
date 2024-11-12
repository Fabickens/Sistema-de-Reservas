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
router.post('/doctor_especialidad', async (req, res) => {
    const { id_doctor, id_especialidad } = req.body;

    try {
        const sql = `INSERT INTO doctor_especialidad (id_doctor, id_especialidad) VALUES (?, ?)`;
        await db.query(sql, [id_doctor, id_especialidad]);
        res.status(201).json({ message: 'Especialidad asignada al doctor exitosamente' });
    } catch (error) {
        console.error("Error al asignar especialidad al doctor:", error);
        res.status(500).json({ message: 'Error al asignar especialidad al doctor', error });
    }
});

// Obtener todas las especialidades de un doctor
router.get('/doctor_especialidades/:id_doctor', async (req, res) => {
    const { id_doctor } = req.params;

    try {
        const sql = `
            SELECT e.nombre, e.descripcion
            FROM especialidades e
            JOIN doctor_especialidad de ON e.id = de.id_especialidad
            WHERE de.id_doctor = ?
        `;
        const [result] = await db.query(sql, [id_doctor]);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener especialidades del doctor:", error);
        res.status(500).json({ message: 'Error al obtener especialidades del doctor', error });
    }
});
 module.exports = router;