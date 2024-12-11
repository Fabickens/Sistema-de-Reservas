import React, { useState, useEffect } from 'react';
import api from '../api'; // Configuración de Axios o Fetch

const DoctorProfile = () => {
    const [doctorData, setDoctorData] = useState({});
    const [isEditing, setIsEditing] = useState(false); // Estado de edición
    const [formData, setFormData] = useState({}); // Datos del formulario

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/doctores/perfil');
                setDoctorData(response.data);
                setFormData(response.data); // Inicializar formulario con los datos actuales
            } catch (error) {
                console.error('Error al cargar perfil:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await api.put('/doctores/perfil', formData);
            alert(response.data.message);
            setDoctorData(formData); // Actualizar datos mostrados
            setIsEditing(false); // Salir del modo de edición
        } catch (error) {
            console.error('Error al guardar perfil:', error);
            alert('No se pudo actualizar el perfil.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
            {isEditing ? (
                <div className="space-y-4">
                    <div>
                        <label className="block font-bold">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Especialidad</label>
                        <input
                            type="text"
                            name="especialidad"
                            value={formData.especialidad || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Experiencia</label>
                        <textarea
                            name="experiencia"
                            value={formData.experiencia || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-bold">Acerca de</label>
                        <textarea
                            name="acerca"
                            value={formData.acerca || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-bold">Precio</label>
                        <input
                            type="number"
                            name="precio"
                            value={formData.precio || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
                    >
                        Guardar
                    </button>
                </div>
            ) : (
                <div>
                    <p><strong>Nombre:</strong> {doctorData.nombre}</p>
                    <p><strong>Especialidad:</strong> {doctorData.especialidad}</p>
                    <p><strong>Experiencia:</strong> {doctorData.experiencia}</p>
                    <p><strong>Acerca de:</strong> {doctorData.acerca}</p>
                    <p><strong>Precio:</strong> ${doctorData.precio}</p>
                    <p><strong>Dirección:</strong> {doctorData.direccion}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-celeste text-white px-4 py-2 rounded mt-4 hover:bg-verde"
                    >
                        Editar
                    </button>
                </div>
            )}
        </div>
    );
};

export default DoctorProfile;
