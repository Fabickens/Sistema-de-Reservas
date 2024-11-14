import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
           

            {/* Sección de Bienvenida */}
            <main className="flex-1 bg-gray-100 p-8">
                <section className="text-center mb-8">
                    <h2 className="text-4xl font-semibold mb-4 text-teal-500">Bienvenido a Salud Nova</h2>
                    <p className="text-lg mb-6 max-w-xl mx-auto">
                        Gestiona tus citas médicas de forma rápida y sencilla. Encuentra doctores de confianza y reserva tus consultas en línea.
                    </p>
                    <div className="space-x-4">
                        <Link to="/register" className="bg-teal-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-400">
                            Crear Cuenta
                        </Link>
                        <Link to="/login" className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-400">
                            Iniciar Sesión
                        </Link>
                    </div>
                </section>

                {/* Sección de Doctores Destacados */}
                <section className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4 text-center text-teal-500">Doctores Destacados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { nombre: "Dr. Juan Pérez", especialidad: "Cardiología" },
                            { nombre: "Dra. María Gómez", especialidad: "Dermatología" },
                            { nombre: "Dr. Carlos Ramírez", especialidad: "Pediatría" },
                        ].map((doctor, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                                <h4 className="text-xl font-bold mb-2">{doctor.nombre}</h4>
                                <p className="text-gray-600">{doctor.especialidad}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;
