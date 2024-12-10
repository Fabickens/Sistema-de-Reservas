import React, { useState } from 'react';
import api from '../../api'; // Configuración de Axios

const RegisterDoctor = () => {
    const [doctorData, setDoctorData] = useState({
        nombre: '',
        correo: '',
        contraseña: '',
        especialidad: '',
        experiencia: '',
        acerca: '',
        precio: '',
        direccion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/doctores/registrar', doctorData);
            alert('Doctor registrado exitosamente');
            setDoctorData({
                nombre: '',
                correo: '',
                contraseña: '',
                especialidad: '',
                experiencia: '',
                acerca: '',
                precio: '',
                direccion: '',
            });
        } catch (error) {
            console.error('Error al registrar el doctor:', error.response ? error.response.data : error.message);
            alert('Error al registrar el doctor. Intenta de nuevo.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Registrar Doctor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={doctorData.nombre}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Correo</label>
                    <input
                        type="email"
                        name="correo"
                        value={doctorData.correo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        name="contraseña"
                        value={doctorData.contraseña}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Especialidad</label>
                    <input
                        type="text"
                        name="especialidad"
                        value={doctorData.especialidad}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Experiencia</label>
                    <textarea
                        name="experiencia"
                        value={doctorData.experiencia}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        rows="3"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Acerca del Doctor</label>
                    <textarea
                        name="acerca"
                        value={doctorData.acerca}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        rows="3"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Precio por Consulta</label>
                    <input
                        type="number"
                        name="precio"
                        value={doctorData.precio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={doctorData.direccion}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
                >
                    Registrar Doctor
                </button>
            </form>
        </div>
    );
};

export default RegisterDoctor;
