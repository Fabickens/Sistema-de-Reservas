const express = require('express');
const router = express.Router();
const db = require('../db'); // Importar conexión a la base de datos
const { authenticateToken, authorizeRole} = require('../middlewares/authMiddleware');


// Crear una cita
router.post('/citas', authenticateToken, async (req, res) => {
    const { id_doctor, fecha, tipo, notas } = req.body;
    const id_paciente = req.user.id; // ID del paciente autenticado
    console.log('Datos recibidos en /citas:', { id_paciente, fecha, tipo, id_doctor, notas });

    try {

        const pacienteCitaSql = `
            SELECT * FROM citas 
            WHERE id_paciente = ? AND fecha = ?
        `;
        const [pacienteCita] = await db.query(pacienteCitaSql, [id_paciente, fecha]);

        if (pacienteCita.length > 0) {
            return res.status(400).json({ message: 'Ya tienes una cita programada para esta fecha y hora.' });
        }

        // Validar si el doctor ya tiene una cita a la misma hora
        const doctorCitaSql = `
            SELECT * FROM citas 
            WHERE id_doctor = ? AND fecha = ?
        `;
        const [doctorCita] = await db.query(doctorCitaSql, [id_doctor, fecha]);

        if (doctorCita.length > 0) {
            return res.status(400).json({ message: 'El doctor ya tiene una cita programada para esta fecha y hora.' });
        }

        const sql = `INSERT INTO citas (fecha, tipo, id_paciente, id_doctor, notas)
                     VALUES (?, ?, ?, ?, ?)`;

        await db.query(sql, [fecha, tipo, id_paciente, id_doctor, notas]);
        res.status(201).json({ message: 'Cita reservada exitosamente'});
    } catch (error) {
        console.error('Error al reservar cita:', error);
        res.status(500).json({ message: 'Error al reservar cita', error });
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

router.get('/citas/personales', authenticateToken, async (req, res) => {
    const id_paciente = req.user.id; // ID del paciente autenticado a través del token

    try {
        const sql = `
            SELECT 
                citas.id AS cita_id,
                citas.fecha,
                citas.tipo,
                citas.estado,
                citas.notas,
                doctores.nombre AS doctor_nombre,
                doctores.especialidad,
                doctores.precio
            FROM 
                citas
            LEFT JOIN 
                doctores ON citas.id_doctor = doctores.id
            WHERE 
                citas.id_paciente = ?;
        `;

        const [result] = await db.query(sql, [id_paciente]);

        if (result.length === 0) {
            return res.status(200).json({ message: 'No tienes citas registradas.', citas: [] });
        }

        res.status(200).json({ citas: result });
    } catch (error) {
        console.error('Error al obtener citas del paciente:', error);
        res.status(500).json({ message: 'Error al obtener citas', error });
    }
});

// Obtener una cita por ID
{router.get('/citas/id/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM citas WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Cita no encontraDAS' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error al obtener cita:", error);
        res.status(500).json({ message: 'Error al obtener cita', error });
    }
});}

router.put('/citas/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { fecha, notas } = req.body;
    const id_usuario = req.user.id; // ID del usuario autenticado

    try {
        // Verificar si la cita pertenece al usuario autenticado
        const [cita] = await db.query(`SELECT * FROM citas WHERE id = ?`, [id]);

        if (!cita.length || cita[0].id_paciente !== id_usuario) {
            return res.status(403).json({ message: 'No tienes permiso para editar esta cita.' });
        }

        // Validar que no haya conflictos para el paciente
        const [conflictingPaciente] = await db.query(
            `SELECT * FROM citas WHERE id_paciente = ? AND fecha = ? AND id != ?`,
            [id_usuario, fecha, id]
        );
        if (conflictingPaciente.length > 0) {
            return res.status(400).json({ message: 'Ya tienes una cita programada en esta fecha y hora.' });
        }

        // Validar que no haya conflictos para el doctor
        const id_doctor = cita[0].id_doctor; // Obtener el ID del doctor de la cita existente
        const [conflictingDoctor] = await db.query(
            `SELECT * FROM citas WHERE id_doctor = ? AND fecha = ? AND id != ?`,
            [id_doctor, fecha, id]
        );
        if (conflictingDoctor.length > 0) {
            return res.status(400).json({ message: 'El doctor ya tiene una cita programada en esta fecha y hora.' });
        }

        // Actualizar la cita
        const sql = `UPDATE citas SET fecha = ?, notas = ? WHERE id = ?`;
        const [result] = await db.query(sql, [fecha, notas, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cita no encontrada.' });
        }

        res.status(200).json({ message: 'Cita actualizada exitosamente.' });
    } catch (error) {
        console.error('Error al editar cita:', error);
        res.status(500).json({ message: 'Error al editar cita.', error });
    }
});



// Actualizar una cita por ID
router.put('/citas/id/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, estado, tipo, id_paciente, id_doctor, costo, notas } = req.body;

    try {
        const sql = `UPDATE citas SET fecha = ?, estado = ?, tipo = ?, id_paciente = ?, id_doctor = ?, costo = ?, notas = ?
                     WHERE id = ?`;

        const [result] = await db.query(sql, [fecha, estado, tipo, id_paciente, id_doctor, costo, notas, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cita no encontradas' });
        }
        res.status(200).json({ message: 'Cita actualizada exitosamente' });
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        res.status(500).json({ message: 'Error al actualizar cita', error });
    }
});

router.delete('/citas/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const id_usuario = req.user.id; // ID del usuario autenticado

    try {
        // Verificar si la cita pertenece al usuario autenticado
        const [cita] = await db.query(`SELECT * FROM citas WHERE id = ?`, [id]);

        if (!cita.length || cita[0].id_paciente !== id_usuario) {
            return res.status(403).json({ message: 'No tienes permiso para cancelar esta cita.' });
        }

        // Eliminar la cita
        const sql = `DELETE FROM citas WHERE id = ?`;
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cita no encontrada.' });
        }

        res.status(200).json({ message: 'Cita cancelada exitosamente.' });
    } catch (error) {
        console.error('Error al cancelar cita:', error);
        res.status(500).json({ message: 'Error al cancelar cita.', error });
    }
});


// Eliminar una cita por ID
router.delete('/citas/id/:id', async (req, res) => {
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

router.get('/citas/doctores', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
    const id_doctor = req.user.id; // ID del doctor autenticado

    try {
        const sql = `
            SELECT 
                citas.id AS cita_id,
                citas.fecha,
                citas.tipo,
                citas.estado,
                citas.notas,
                usuarios.nombre AS paciente_nombre
            FROM 
                citas
            LEFT JOIN 
                usuarios ON citas.id_paciente = usuarios.id
            WHERE 
                citas.id_doctor = ?;
        `;

        const [result] = await db.query(sql, [id_doctor]);

        if (result.length === 0) {
            return res.status(200).json({ message: 'No tienes citas registradas.', citas: [] });
        }

        res.status(200).json({ citas: result });
    } catch (error) {
        console.error('Error al obtener citas del doctor:', error);
        res.status(500).json({ message: 'Error al obtener citas', error });
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