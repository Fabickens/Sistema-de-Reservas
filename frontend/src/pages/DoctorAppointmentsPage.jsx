import React, { useState, useEffect } from 'react';
import api from '../api';

const DoctorAppointmentsPage = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await api.get('/citas/mis-citas-doctor');
                setCitas(response.data.citas);
            } catch (error) {
                console.error('Error al cargar citas:', error.response?.data || error.message);
            }
        };

        fetchCitas();
    }, []);

    return (
        <div>
            <h1>Mis Citas como Doctor</h1>
            {citas.length > 0 ? (
                <ul>
                    {citas.map((cita) => (
                        <li key={cita.cita_id}>
                            <p>Paciente: {cita.paciente_nombre}</p>
                            <p>Fecha: {new Date(cita.fecha).toLocaleString()}</p>
                            <p>Tipo: {cita.tipo}</p>
                            <p>Notas: {cita.notas || 'Sin notas'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes citas registradas.</p>
            )}
        </div>
    );
};

export default DoctorAppointmentsPage;
