import React, { useState, useEffect } from 'react';
import api from '../api'; // Axios configurado

const AppointmentsPage = () => {
    const [citas, setCitas] = useState([]);
    const [editingCita, setEditingCita] = useState(null); // Cita en edición
    const [newFecha, setNewFecha] = useState(''); // Nueva fecha para edición
    const [newNotas, setNewNotas] = useState(''); // Nuevas notas para edición

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                // Cambia a la nueva ruta
                const response = await api.get('/citas/personales');
                setCitas(response.data.citas);
            } catch (error) {
                console.error('Error al cargar citas:', error.response?.data || error.message);
            }
        };

        fetchCitas();
    }, []);
    
    
    // Manejar la cancelación de citas
    const handleCancel = async (id) => {
        try {
            await api.delete(`/citas/${id}`);
            alert('Cita cancelada exitosamente.');
            setCitas(citas.filter((cita) => cita.cita_id !== id)); // Actualizar lista en el frontend
        } catch (error) {
            console.error('Error al cancelar cita:', error.response?.data || error.message);
            alert('No se pudo cancelar la cita.');
        }
    };

     // Manejar el inicio de edición
     const handleEditStart = (cita) => {
        setEditingCita(cita);
        setNewFecha(cita.fecha);
        setNewNotas(cita.notas || '');
    };

    // Manejar la edición de citas
    const handleEditSubmit = async (id) => {
        try {
            await api.put(`/citas/${id}`, {
                fecha: newFecha,
                notas: newNotas
            });
            alert('Cita actualizada exitosamente.');
            setEditingCita(null); // Salir del modo de edición
            // Actualizar la lista de citas
            setCitas(citas.map((cita) => (
                cita.cita_id === id 
                ? { ...cita, fecha: newFecha, notas: newNotas }
                : cita
            )));
        } catch (error) {
            console.error('Error al editar cita:', error.response?.data || error.message);
            alert('No se pudo actualizar la cita.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="pb-3 text-2xl font-medium mb-4 text-gray-600 border-b">Mis Citas</h1>
            {citas.length > 0 ? (
                <ul className="space-y-4">
                    {citas.map((cita) => (
                        <li
                            key={cita.cita_id}
                            className="text-base font-normal mb-4 text-gray-600 border rounded-lg p-4 shadow-md"
                        >
                            <p><strong>Doctor:</strong> {cita.doctor_nombre}</p>
                            <p><strong>Fecha:</strong> {new Date(cita.fecha).toLocaleString()}</p>
                            <p><strong>Tipo:</strong> {cita.tipo}</p>
                            <p><strong>Notas:</strong> {cita.notas || 'Sin notas'}</p>

                            {/* Botones de acciones */}
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleEditStart(cita)}
                                    className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleCancel(cita.cita_id)}
                                    className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes citas registradas.</p>
            )}

            {/* Formulario para editar cita */}
            {editingCita && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Editar Cita</h2>
                        <label className="block mb-2">
                            Nueva Fecha:
                            <input
                                type="datetime-local"
                                value={newFecha}
                                onChange={(e) => setNewFecha(e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </label>
                        <label className="block mb-4">
                            Notas:
                            <textarea
                                value={newNotas}
                                onChange={(e) => setNewNotas(e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            ></textarea>
                        </label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleEditSubmit(editingCita.cita_id)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setEditingCita(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsPage;
