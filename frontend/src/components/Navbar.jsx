import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate} from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        navigate('/login'); // Redirigir al login después de cerrar sesión
    };

    // Verificar si el usuario está autenticado
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />

            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>INICIO</li>
                    <hr className='border-none outline-none h-0.5 bg-verde w-3/5 m-auto hidden'/>
                </NavLink>
                <NavLink to='/doctores'>
                    <li className='py-1'>DOCTORES</li>
                    <hr className='border-none outline-none h-0.5 bg-verde w-3/5 m-auto hidden'/>
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>SOBRE NOSOTROS</li>
                    <hr className='border-none outline-none h-0.5 bg-verde w-3/5 m-auto hidden'/>
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>CONTACTO</li>
                    <hr className='border-none outline-none h-0.5 bg-verde w-3/5 m-auto hidden'/>
                </NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                {
                    isLoggedIn 
                    ?(<div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img className='w-8 rounded-full' src={assets.usuario} alt="" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                          <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                            <p onClick={() => navigate('')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => navigate('/appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                    <NavLink to='/register' className='bg-celeste text-white px-8 py-3 rounded-full font-bold hidden md:block'>
                        Crear Cuenta
                    </NavLink>
                    )
                }
            </div>
            <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        </div>
    );
};

export default Navbar;
