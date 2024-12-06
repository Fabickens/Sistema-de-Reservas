import React, { useState, useEffect } from 'react';
import api from '../api'; // Configuración de Axios o Fetch

const ProfilePage = () => {
    const [userData, setUserData] = useState({}); // Datos del usuario
    const [editing, setEditing] = useState(false); // Estado de edición
    const [formData, setFormData] = useState({}); // Datos para editar
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Cargar los datos del usuario al montar el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/usuarios/perfil');
                setUserData(response.data);
                setFormData(response.data); // Inicializar los datos del formulario
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error);
            }
        };

        fetchUserData();
    }, []);

    // Manejar los cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Guardar los cambios
    const handleSave = async () => {
        try {
            const response = await api.put('/usuarios/perfil', formData);
            setUserData(response.data); // Actualizar los datos en la pantalla
            setEditing(false); // Salir del modo de edición
            setSuccessMessage('Datos actualizados correctamente.');
            setErrorMessage('');
        } catch (error) {
            console.error('Error al actualizar los datos:', error.response?.data || error.message);
            setErrorMessage('No se pudo actualizar la información. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

            {/* Mensajes de éxito o error */}
            {successMessage && (
                <p className="text-green-600 bg-green-100 p-4 rounded mb-4">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-red-600 bg-red-100 p-4 rounded mb-4">{errorMessage}</p>
            )}

            <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto">
                {editing ? (
                    // Modo de edición
                    <div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre || ''}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Correo</label>
                            <input
                                type="email"
                                name="correo"
                                value={formData.correo || ''}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                value={formData.telefono || ''}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion || ''}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        {/* Género */}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Género</label>
                            <select
                                name="genero"
                                value={formData.genero || ''}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            >
                                <option value="">-- Seleccionar Género --</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        {/* Fecha de Nacimiento */}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                name="fecha_nacimiento"
                                value={formData.fecha_nacimiento || ''}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 mr-4"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    // Modo de visualización
                    <div>
                        <p className="mb-4"><strong>Nombre:</strong> {userData.nombre}</p>
                        <p className="mb-4"><strong>Correo:</strong> {userData.correo}</p>
                        <p className="mb-4"><strong>Teléfono:</strong> {userData.telefono || 'No registrado'}</p>
                        <p className="mb-4"><strong>Dirección:</strong> {userData.direccion || 'No registrada'}</p>
                        <p className="mb-4"><strong>Género:</strong> {userData.genero || 'No registrado'}</p>
                        <p className="mb-4"><strong>Fecha de Nacimiento:</strong> {userData.fecha_nacimiento || 'No registrada'}</p>
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                        >
                            Editar Perfil
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
