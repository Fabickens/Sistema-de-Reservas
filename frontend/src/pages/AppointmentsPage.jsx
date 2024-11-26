import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentsPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Mis Citas</h1>
            <div className="flex justify-between items-center mb-6">
                <p>Consulta y gestiona tus citas médicas.</p>
                <Link
                    to="/appointments/new"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Nueva Cita
                </Link>
            </div>
            {/* Aquí se mostrarán las citas */}
            <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-600">Aún no tienes citas programadas.</p>
            </div>
        </div>
    );
};

export default AppointmentsPage;
