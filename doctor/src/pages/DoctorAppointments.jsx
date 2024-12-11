import React, { useState, useEffect } from 'react';
import api from '../api'; // Configuración de Axios o Fetch

const DoctorAppointments = () => {
    const [citas, setCitas] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await api.get('/citas/doctores');
                setCitas(response.data.citas);
            } catch (error) {
                console.error('Error al cargar citas:', error.response?.data || error.message);
                setErrorMessage(error.response?.data?.message || 'Error al cargar citas.');
            }
        };

        fetchCitas();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Citas Programadas</h1>

            {errorMessage && (
                <p className="text-red-600 bg-red-100 p-4 rounded mb-4">{errorMessage}</p>
            )}

            {citas.length > 0 ? (
                <ul className="space-y-4">
                    {citas.map((cita) => (
                        <li
                            key={cita.cita_id}
                            className="border p-4 rounded shadow hover:shadow-lg transition-all"
                        >
                            <p><strong>Paciente:</strong> {cita.paciente_nombre}</p>
                            <p><strong>Fecha:</strong> {new Date(cita.fecha).toLocaleString()}</p>
                            <p><strong>Tipo:</strong> {cita.tipo}</p>
                            <p><strong>Notas:</strong> {cita.notas || 'Sin notas'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes citas programadas.</p>
            )}
        </div>
    );
};

export default DoctorAppointments;
