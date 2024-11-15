import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />

            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>INICIO</li>
                    <hr className='border-none outline-none h-0.5 bg-verde w-3/5 m-auto hidden'/>
                </NavLink>
                <NavLink to='/doctors'>
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
                <NavLink to='/register' className='bg-celeste text-white px-8 py-3 rounded-full font-bold hidden md:block'>
                    Crear Cuenta
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
