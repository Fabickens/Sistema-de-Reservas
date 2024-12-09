const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear una nueva entrada en el historial médico
router.post('/historial', async (req, res) => {
    const { id_paciente, id_doctor, descripcion, tratamiento } = req.body;

    try {
        const sql = `INSERT INTO historial_medico (id_paciente, id_doctor, descripcion, tratamiento, fecha)
                     VALUES (?, ?, ?, ?, NOW())`;
        
        await db.query(sql, [id_paciente, id_doctor, descripcion, tratamiento]);
        res.status(201).json({ message: 'Entrada en el historial creada exitosamente' });
    } catch (error) {
        console.error("Error al crear entrada en el historial:", error);
        res.status(500).json({ message: 'Error al crear entrada en el historial', error });
    }
});

// Obtener el historial médico completo de un paciente
router.get('/historial/:id_paciente', async (req, res) => {
    const { id_paciente } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM historial_medico WHERE id_paciente = ?', [id_paciente]);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener historial médico:", error);
        res.status(500).json({ message: 'Error al obtener historial médico', error });
    }
});

// Actualizar una entrada en el historial médico por ID
router.put('/historial/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcion, tratamiento } = req.body;

    try {
        const sql = `UPDATE historial_medico SET descripcion = ?, tratamiento = ? WHERE id = ?`;
        const [result] = await db.query(sql, [descripcion, tratamiento, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Entrada en el historial no encontrada' });
        }
        res.status(200).json({ message: 'Entrada en el historial actualizada exitosamente' });
    } catch (error) {
        console.error("Error al actualizar entrada en el historial:", error);
        res.status(500).json({ message: 'Error al actualizar entrada en el historial', error });
    }
});

// Eliminar una entrada en el historial médico por ID
router.delete('/historial/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM historial_medico WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Entrada en el historial no encontrada' });
        }
        res.status(200).json({ message: 'Entrada en el historial eliminada exitosamente' });
    } catch (error) {
        console.error("Error al eliminar entrada en el historial:", error);
        res.status(500).json({ message: 'Error al eliminar entrada en el historial', error });
    }
});

module.exports = router;