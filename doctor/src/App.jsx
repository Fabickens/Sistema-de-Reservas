import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginDoctorPage from './pages/DoctorLogin';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorProfile from './pages/DoctorProfile';
import ProtectedRoute3 from './components/ProtectedRoute3';


const DoctorApp = () => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    
    return (
        <Router>
            <div className="flex h-screen">
                {token && <Sidebar />}
                <div className="flex-grow flex flex-col">
                    {token && <Navbar />}
                    <div className="flex-grow p-4">
                        <Routes>
                            <Route path="/" element={<LoginDoctorPage/>} />
                            <Route path="/DoctorAppointments" element={<ProtectedRoute3> <DoctorAppointments/> </ProtectedRoute3>} />
                            <Route path="/DoctorProfile" element={<ProtectedRoute3> <DoctorProfile/> </ProtectedRoute3>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default DoctorApp;
