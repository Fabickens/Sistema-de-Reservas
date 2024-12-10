import React, { useState, useEffect } from 'react';
import api from '../../api'; // Configuración de Axios o Fetch



const DoctorsManagement = () => {
    const [doctores, setDoctores] = useState([]); // Lista de doctores
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Doctor seleccionado
 
    // Cargar doctores al iniciar
    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const response = await api.get('/doctores');
                setDoctores(response.data);
            } catch (error) {
                console.error('Error al cargar doctores:', error);
            }
        };

        fetchDoctores();
    }, []);


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Lista de Doctores</h1>

            {/* Selección de doctor con imágenes */}
            <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctores.map((doctor) => (
                        <div
                            key={doctor.id}
                            className={`border border-teal-300 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all ${
                                selectedDoctor === doctor.id ? 'bg-blue-100 border-blue-500' : ''
                            }`}
                            onClick={() => setSelectedDoctor(doctor.id)}
                        >
                            <img
                                 
                            />
                            <h3 className="text-lg font-bold">{doctor.nombre}</h3>
                            <p className="text-sm text-gray-600">{doctor.especialidad}</p>
                            <p className="text-sm text-gray-600">${doctor.precio} por consulta</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorsManagement;
