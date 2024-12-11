import React from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Obtén el token del localStorage

    if (!token) {
        return null; // No renderizar el Navbar si no hay token
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirige al login después de cerrar sesión
    };

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer' src={assets.logo} alt="Logo" />
            </div>
            <button onClick={handleLogout} className='bg-verde text-white text-sm px-10 py-2 rounded-full hover:bg-celeste'>Logout</button>
        </div>
    );
};

export default Navbar;
