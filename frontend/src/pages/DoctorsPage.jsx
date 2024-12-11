import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Configuración de Axios o fetch

const DoctorCard = ({ doctor, onClick }) => (
    <div
        onClick={onClick}
        className="border border-teal-300 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
    >
        <img
            className="bg-fondo" 
            src={new URL(`../${doctor.imagen}`, import.meta.url).href} 
            alt={doctor.nombre}
        />
        <p className="text-lg font-bold text-gray-800">{doctor.nombre}</p>
        <p className="text-sm text-gray-600">{doctor.especialidad}</p>
        <p className="text-sm text-gray-600">${doctor.precio} por consulta</p>
    </div>
);

const DoctorsPage = () => {
    const [doctores, setDoctores] = useState([]);
    const [filterDoc, setFilterDoc] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const response = await api.get('/doctores');
                setDoctores(response.data);
                setFilterDoc(response.data);

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

    const handleSpecialityFilter = (speciality) => {
        if (selectedSpeciality === speciality) {
            setSelectedSpeciality('');
            setFilterDoc(doctores);
        } else {
            setSelectedSpeciality(speciality);
            setFilterDoc(doctores.filter((doc) => doc.especialidad === speciality));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <p className="text-black font-semibold">Te presentamos nuestro personal altamente capacitado.</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <div className="flex-col gap-4 text-sm text-black font-semibold flex">
                    {specialities.map((speciality) => (
                        <button
                            key={speciality}
                            onClick={() => handleSpecialityFilter(speciality)}
                            className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                                selectedSpeciality === speciality ? 'bg-celeste text-white ' : ''
                            }`}
                        >
                            {speciality}
                        </button>
                    ))}
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterDoc.length > 0 ? (
                        filterDoc.map((doctor) => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onClick={() => navigate(`/appointments/new`)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay doctores disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorsPage;
