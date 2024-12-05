import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api'; // Configuración de Axios o fetch

const DoctorsPage = () => {
    const [doctores, setDoctores] = useState([]); // Lista completa de doctores
    const [filterDoc, setFilterDoc] = useState([]); // Doctores filtrados
    const [specialities, setSpecialities] = useState([]); // Especialidades únicas
    const [selectedSpeciality, setSelectedSpeciality] = useState(''); // Especialidad seleccionada
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                // Solicitar doctores desde el backend
                const response = await api.get('/doctores');
                setDoctores(response.data);
                setFilterDoc(response.data); // Mostrar todos inicialmente

                // Obtener especialidades únicas de los doctores
                const uniqueSpecialities = [
                    ...new Set(response.data.map((doctor) => doctor.especialidad))
                ];
                setSpecialities(uniqueSpecialities);
            } catch (error) {
                console.error('Error al cargar doctores:', error);
            }
        };

        fetchDoctores();
    }, []);

    // Manejar la selección de filtros
    const handleSpecialityFilter = (speciality) => {
        if (selectedSpeciality === speciality) {
            setSelectedSpeciality(''); // Quitar filtro
            setFilterDoc(doctores); // Mostrar todos los doctores
        } else {
            setSelectedSpeciality(speciality);
            setFilterDoc(doctores.filter((doc) => doc.especialidad === speciality));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <p className="text-black font-semibold">Busca doctores inmediatamente por especialidad.</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                {/* Filtros */}
                <div className="flex-col gap-4 text-sm text-black font-semibold flex">
                    {specialities.map((speciality) => (
                        <p
                            key={speciality}
                            onClick={() => handleSpecialityFilter(speciality)}
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                                selectedSpeciality === speciality ? 'bg-celeste text-white ' : ''
                            }`}
                        >
                            {speciality}
                        </p>
                    ))}
                </div>

                {/* Listado de Doctores */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterDoc.map((doctor) => (
                        <div
                            key={doctor.id}
                            onClick={() => navigate(`/appointment/${doctor.id}`)}
                            className="border border-gray-300 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all"
                        >
                            <p className="text-lg font-bold text-gray-800">{doctor.nombre}</p>
                            <p className="text-sm text-gray-600">{doctor.especialidad}</p>
                            <p className="text-sm text-gray-600">{doctor.direccion}</p>
                            <p className="text-sm text-gray-600">${doctor.precio} por consulta</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorsPage;
