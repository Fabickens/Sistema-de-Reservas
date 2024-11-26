import React, { useState } from 'react';

const NewAppointmentPage = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [doctor, setDoctor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ date, time, specialty, doctor });
        // Aquí puedes llamar al backend para reservar la cita
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Reservar Nueva Cita</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Hora</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Especialidad</label>
                    <select
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar Especialidad</option>
                        <option value="cardiologia">Cardiología</option>
                        <option value="dermatologia">Dermatología</option>
                        <option value="pediatria">Pediatría</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Doctor</label>
                    <input
                        type="text"
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Nombre del Doctor"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Reservar
                </button>
            </form>
        </div>
    );
};

export default NewAppointmentPage;
