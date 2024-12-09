import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <h2 className="text-xl font-bold p-4">Sidebar Básico</h2>
            <ul className="p-4">
                <li className="p-2">Opción 1</li>
                <li className="p-2">Opción 2</li>
            </ul>
        </div>
    );
};

export default Sidebar;
