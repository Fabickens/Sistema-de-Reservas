const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear una notificación
router.post('/notificaciones', async (req, res) => {
    const { id_usuario, mensaje, tipo } = req.body;

    try {
        const sql = `INSERT INTO notificaciones (id_usuario, mensaje, tipo) VALUES (?, ?, ?)`;
        await db.query(sql, [id_usuario, mensaje, tipo]);
        res.status(201).json({ message: 'Notificación creada exitosamente' });
    } catch (error) {
        console.error("Error al crear notificación:", error);
        res.status(500).json({ message: 'Error al crear notificación', error });
    }
});

// Obtener todas las notificaciones
router.get('/notificaciones', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM notificaciones');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        res.status(500).json({ message: 'Error al obtener notificaciones', error });
    }
});

// Actualizar una notificación
router.put('/notificaciones/:id', async (req, res) => {
    const { id } = req.params;
    const { mensaje, tipo, estado } = req.body;

    try {
        const sql = `UPDATE notificaciones SET mensaje = ?, tipo = ?, estado = ? WHERE id = ?`;
        const [result] = await db.query(sql, [mensaje, tipo, estado, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.status(200).json({ message: 'Notificación actualizada exitosamente' });
    } catch (error) {
        console.error("Error al actualizar notificación:", error);
        res.status(500).json({ message: 'Error al actualizar notificación', error });
    }
});

// Eliminar una notificación
router.delete('/notificaciones/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM notificaciones WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.status(200).json({ message: 'Notificación eliminada exitosamente' });
    } catch (error) {
        console.error("Error al eliminar notificación:", error);
        res.status(500).json({ message: 'Error al eliminar notificación', error });
    }
});

module.exports = router;
