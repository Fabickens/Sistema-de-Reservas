import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Obtén el token del localStorage

    // Si no hay token, no renderizar el Sidebar
    if (!token) {
        return null;
    }

    // Opciones del Sidebar
    const menuOptions = [
        { label: 'Lista de Doctores', path: '/DoctorsManagement' },
        { label: 'Lista de Usuarios', path: '/UsersManagement' },
        { label: 'Registrar Doctores', path: '/RegisterDoctor' },
    ];

    return (
        <div className="w-64 h-screen bg-slate-200 text-gray">
            <h2 className="text-xl text-center font-bold p-4 bg-verde text-white px-10 py-2 ">Panel de Administración</h2>
            <ul className="p-4">
                {menuOptions.map((option, index) => (
                    <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-celeste"
                        onClick={() => navigate(option.path)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
