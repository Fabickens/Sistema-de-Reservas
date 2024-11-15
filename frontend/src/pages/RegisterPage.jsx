import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-centerl">
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <h2 className="text-2xl font-semibold">Crear Cuenta</h2>
                <p>Por favor cree una cuenta para reservar una cita</p>
                <div className="w-full">
                <p>Cédula</p>
                    <input
                        type="text"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        required
                    />
                </div>
                <div className="w-full">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        required
                    />
                </div>
                <div className="w-full">
                    <label className="block text-gray-700">Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        required
                    />
                </div>
                <div className="w-full">
                    <label className="block text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-verde text-white w-full py-2 rounded-md text-base font-semibold hover:bg-celeste"
                >
                    Crear Cuenta
                </button>
                <p>¿Ya tienes una cuenta? <Link to='/login'className='text-primary underline cursor-pointer'>Inicia sesión</Link></p>
            </div>
        </form>  
    );
}

export default RegisterPage;
