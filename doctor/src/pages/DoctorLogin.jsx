import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

function LoginDoctorPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/doctores/login', {
                correo: email,
                contraseña: password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
                alert('Inicio de sesión exitoso');
                navigate('/DoctorAppointments'); // Redirigir al dashboard o página principal
            }
        } catch (error) {
            console.error('Error muy malo:', error.response ? error.response.data : error.message);
            alert('Error al iniciar sesión. Correo o contraseña incorrectos.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-teal-500'>Doc</span>tores</p>
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
            </div>
        </form>
    );
}

export default LoginDoctorPage;
