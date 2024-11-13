import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Encabezado */}
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Salud Nova</h1>
                <nav className="space-x-4">
                    <Link to="/" className="hover:text-gray-300">Inicio</Link>
                    <Link to="/about" className="hover:text-gray-300">Acerca de</Link>
                    <Link to="/doctors" className="hover:text-gray-300">Doctores</Link>
                    <Link to="/login" className="hover:text-gray-300">Iniciar Sesión</Link>
                    <Link to="/register" className="hover:text-gray-300">Crear Cuenta</Link>
                </nav>
            </header>

            {/* Sección de Bienvenida */}
            <main className="flex-1 bg-gray-100 p-8">
                <section className="text-center mb-8">
                    <h2 className="text-4xl font-semibold mb-4 text-blue-600">Bienvenido a Salud Nova</h2>
                    <p className="text-lg mb-6 max-w-xl mx-auto">
                        Gestiona tus citas médicas de forma rápida y sencilla. Encuentra doctores de confianza y reserva tus consultas en línea.
                    </p>
                    <div className="space-x-4">
                        <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            Crear Cuenta
                        </Link>
                        <Link to="/login" className="bg-gray-300 text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-400">
                            Iniciar Sesión
                        </Link>
                    </div>
                </section>

                {/* Sección de Doctores Destacados */}
                <section className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4 text-center text-blue-600">Doctores Destacados</h3>
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
