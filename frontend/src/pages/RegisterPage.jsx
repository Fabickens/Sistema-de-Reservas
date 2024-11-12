import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [cedula, setCedula] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            const response = await api.post('/usuarios/registrar', {
                cedula: cedula,
                nombre: name,
                correo: email,
                contraseña: password,
            });

            if (response.status === 201) {
                alert('Registro exitoso');
                navigate('/login'); // Redirigir al inicio de sesión después del registro
            }
        } catch (error) {
            console.error('Error al registrar:', error.response ? error.response.data : error.message);
            alert('Error al registrar. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Crear Cuenta</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Cédula</label>
                    <input
                        type="text"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
