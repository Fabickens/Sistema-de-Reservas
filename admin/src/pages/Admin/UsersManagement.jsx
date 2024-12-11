import React, { useState, useEffect } from 'react';
import api from '../../api'; // Configuración de Axios o Fetch

const UsersManagement = () => {
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
    const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado
 
    // Cargar usuarios al iniciar
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get('/usuarios'); // Endpoint para obtener usuarios
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Lista de Usuarios</h1>

            {/* Selección de usuario */}
            <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {usuarios.map((usuario) => (
                        <div
                            key={usuario.id}
                            className={`border border-teal-300 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all ${
                                selectedUser === usuario.id ? 'bg-blue-100 border-blue-500' : ''
                            }`}
                            onClick={() => setSelectedUser(usuario.id)}
                        >
                            <h3 className="text-lg font-bold mt-4">{usuario.nombre}</h3>
                            <p className="text-sm text-gray-600">Correo: {usuario.correo}</p>
                            <p className="text-sm text-gray-600">Rol: {usuario.rol}</p>
                            <p className="text-sm text-gray-600">Teléfono: {usuario.telefono || 'Sin registrar'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersManagement;
