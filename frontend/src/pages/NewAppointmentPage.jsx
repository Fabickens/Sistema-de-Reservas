import React, { useState, useEffect } from 'react';
import api from '../api'; // Configuración de Axios o Fetch

const NewAppointmentPage = () => {
    const [doctores, setDoctores] = useState([]); // Lista de doctores
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Doctor seleccionado
    const [fecha, setFecha] = useState(''); // Fecha de la cita
    const [tipo, setTipo] = useState('Presencial'); // Tipo de cita
    const [notas, setNotas] = useState(''); // Notas adicionales

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Cargar doctores al iniciar
    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const response = await api.get('/doctores');
                setDoctores(response.data);
            } catch (error) {
                console.error('Error al cargar doctores:', error);
            }
        };

        fetchDoctores();
    }, []);

    // Manejar la reserva de citas
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDoctor || !fecha) {
            setErrorMessage('Selecciona un doctor y una fecha válida.');
            return;
        }

        try {
            const response = await api.post('/citas', {
                id_doctor: selectedDoctor,
                fecha,
                tipo,
                notas,
            });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            console.error('Error al reservar cita:', error.response?.data || error.message);
            setErrorMessage('No se pudo reservar la cita. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Reservar Cita</h1>

            {/* Mensajes de éxito o error */}
            {successMessage && (
                <p className="text-green-600 bg-green-100 p-4 rounded mb-4">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-red-600 bg-red-100 p-4 rounded mb-4">{errorMessage}</p>
            )}

            {/* Selección de doctor con imágenes */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Seleccionar Doctor</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctores.map((doctor) => (
                        <div
                            key={doctor.id}
                            className={`border border-teal-300 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all ${
                                selectedDoctor === doctor.id ? 'bg-blue-100 border-blue-500' : ''
                            }`}
                            onClick={() => setSelectedDoctor(doctor.id)}
                        >
                            <img
                                className="bg-fondo" 
                                src={new URL(`../${doctor.imagen}`, import.meta.url).href} 
                                alt={doctor.nombre}
                            />
                            <h3 className="text-lg font-bold">{doctor.nombre}</h3>
                            <p className="text-sm text-gray-600">{doctor.especialidad}</p>
                            <p className="text-sm text-gray-600">${doctor.precio} por consulta</p>
                        </div>
                    ))}
                </div>
                {!selectedDoctor && (
                    <p className="text-sm text-red-500 mt-2">Selecciona un doctor para continuar.</p>
                )}
            </div>

            {/* Formulario para detalles de la cita */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto">
                {/* Fecha */}
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2">Fecha y Hora</label>
                    <input
                        type="datetime-local"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full p-3 border rounded"
                        required
                    />
                </div>

                {/* Tipo de cita */}
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2">Tipo de Cita</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="tipo"
                                value="Presencial"
                                checked={tipo === 'Presencial'}
                                onChange={(e) => setTipo(e.target.value)}
                                className="mr-2"
                            />
                            Presencial
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="tipo"
                                value="Virtual"
                                checked={tipo === 'Virtual'}
                                onChange={(e) => setTipo(e.target.value)}
                                className="mr-2"
                            />
                            Virtual
                        </label>
                    </div>
                </div>

                {/* Notas */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-2">Notas</label>
                    <textarea
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                        className="w-full p-3 border rounded"
                        rows="4"
                        placeholder="Opcional: Escribe detalles adicionales..."
                    ></textarea>
                </div>

                {/* Botón de enviar */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Reservar Cita
                </button>
            </form>
        </div>
    );
};

export default NewAppointmentPage;
