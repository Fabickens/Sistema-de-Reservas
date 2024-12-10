import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorsManagement from './pages/Admin/DoctorsManagement';
import LoginAdminPage from './pages/Login';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import RegisterDoctor from './pages/Admin/RegisterDoctor';
import ProtectedRoute2 from './components/ProtectedRoute';




const AdminApp = () => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    
    return (
        <Router>
            <div className="flex h-screen">
                {token && <Sidebar />}
                <div className="flex-grow flex flex-col">
                    {token && <Navbar />}
                    <div className="flex-grow p-4">
                        <Routes>
                            <Route path="/" element={<LoginAdminPage/>} />
                            <Route path="/DoctorsManagement" element={<ProtectedRoute2> <DoctorsManagement /></ProtectedRoute2>} />
                            <Route path="/RegisterDoctor" element={<ProtectedRoute2> <RegisterDoctor /> </ProtectedRoute2>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default AdminApp;
