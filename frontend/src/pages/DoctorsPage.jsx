import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Ajusta según tu configuración de Axios o fetch

const DoctorsPage = () => {
    const [doctores, setDoctores] = useState([]); // Lista de doctores
    const [filterDoc, setFilterDoc] = useState([]); // Doctores filtrados
    const [speciality, setSpeciality] = useState(''); // Especialidad seleccionada
    const [showFilter, setShowFilter] = useState(false); // Mostrar/ocultar filtros
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const response = await api.get('/doctores'); // Endpoint del backend
                setDoctores(response.data);
                setFilterDoc(response.data); // Inicialmente mostrar todos los doctores
            } catch (error) {
                console.error('Error al cargar doctores:', error);
            }
        };

        fetchDoctores();
    }, []);

    // Manejar la selección de especialidades
    const handleSpeciality = (selectedSpeciality) => {
        if (speciality === selectedSpeciality) {
            setSpeciality('');
            setFilterDoc(doctores); // Mostrar todos los doctores si se deselecciona
        } else {
            setSpeciality(selectedSpeciality);
            setFilterDoc(doctores.filter(doc => doc.especialidad === selectedSpeciality));
        }
    };

    return (
        <div>
            <p className='text-gray-600'>Filtra la busqueda por especialidad.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>
                    Filters
                </button>
                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    {['Medico General', 'Ginecologia', 'Dermatologia', 'Pediatria', 'Neurologia', 'Cardiologia'].map((specialityName) => (
                        <p
                            key={specialityName}
                            onClick={() => handleSpeciality(specialityName)}
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === specialityName ? 'bg-[#E2E5FF] text-black ' : ''}`}
                        >
                            {specialityName}
                        </p>
                    ))}
                </div>
                <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                    {filterDoc.map((item, index) => (
                        <div
                            onClick={() => { navigate(`/appointment/${item.id}`); window.scrollTo(0, 0); }}
                            className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                            key={index}
                        >
                            <img className='bg-[#EAEFFF]' src={item.image || 'default-image-path'} alt="Doctor" />
                            <div className='p-4'>
                                <p className='text-[#262626] text-lg font-medium'>{item.nombre}</p>
                                <p className='text-[#5C5C5C] text-sm'>{item.especialidad}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorsPage;
