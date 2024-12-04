const express = require('express');
const router = express.Router();
const db = require('../db'); // Importar conexión a la base de datos
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');


// Crear una nueva cita
router.post('/citas', async (req, res) => {
    const { fecha, estado, tipo, id_paciente, id_doctor, costo, notas } = req.body;

    try {
        const sql = `INSERT INTO citas (fecha, estado, tipo, id_paciente, id_doctor, costo, notas)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

        await db.query(sql, [fecha, estado, tipo, id_paciente, id_doctor, costo, notas]);
        res.status(201).json({ message: 'Cita creada exitosamente' });
    } catch (error) {
        console.error("Error al crear cita:", error);
        res.status(500).json({ message: 'Error al crear cita', error });
    }
});

// Obtener todas las citas
router.get('/citas', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM citas');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener citas:", error);
        res.status(500).json({ message: 'Error al obtener citas', error });
    }
});

// Obtener una cita por ID
router.get('/citas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM citas WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error al obtener cita:", error);
        res.status(500).json({ message: 'Error al obtener cita', error });
    }
});

// Actualizar una cita por ID
router.put('/citas/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, estado, tipo, id_paciente, id_doctor, costo, notas } = req.body;

    try {
        const sql = `UPDATE citas SET fecha = ?, estado = ?, tipo = ?, id_paciente = ?, id_doctor = ?, costo = ?, notas = ?
                     WHERE id = ?`;

        const [result] = await db.query(sql, [fecha, estado, tipo, id_paciente, id_doctor, costo, notas, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.status(200).json({ message: 'Cita actualizada exitosamente' });
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        res.status(500).json({ message: 'Error al actualizar cita', error });
    }
});

// Eliminar una cita por ID
router.delete('/citas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM citas WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.status(200).json({ message: 'Cita eliminada exitosamente' });
    } catch (error) {
        console.error("Error al eliminar cita:", error);
        res.status(500).json({ message: 'Error al eliminar cita', error });
    }
});

//Ver citas de un paciente (solo pacientes)
router.get('/citas/paciente/:id', authenticateToken, authorizeRole(['paciente']), async (req, res) => {
    const { id } = req.params;
    if (req.user.id != id) {
        return res.status(403).json({ message: 'No puedes acceder a las citas de otro paciente.' });
    }

    try {
        const sql = `SELECT * FROM citas WHERE id_paciente = ?`;
        const [result] = await db.query(sql, [id]);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener citas del paciente:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

//Ver citas de un doctor (solo doctores)
router.get('/citas/doctor/:id', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
    const { id } = req.params;
    if (req.user.id != id) {
        return res.status(403).json({ message: 'No puedes acceder a las citas de otro doctor.' });
    }

    try {
        const sql = `SELECT * FROM citas WHERE id_doctor = ?`;
        const [result] = await db.query(sql, [id]);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener citas del doctor:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});
 module.exports = router;