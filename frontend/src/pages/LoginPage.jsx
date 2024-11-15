import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/usuarios/login', {
                correo: email,
                contraseña: password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
                alert('Inicio de sesión exitoso');
                navigate('/'); // Redirigir al dashboard o página principal
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
            alert('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
                <p>Por favor inicie sesión para reservar una cita</p>
                <div className="w-full">
                    <p>Correo</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Contraseña</p>
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
                    Iniciar Sesión
                </button>
                <p>¿Todavía no tienes una cuenta? <Link to='/register' className='text-primary underline cursor-pointer'>Regístrate</Link></p>
            </div>
        </form>
    );
}

export default LoginPage;
