import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DoctorsManagement from './pages/Admin/DoctorsManagement';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';



const AdminApp = () => {
    const isAuthenticated = !!localStorage.getItem('token'); 

    return (
        <Router>
            {isAuthenticated && <Navbar/>}
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/DoctorsManagement" element={<DoctorsManagement/>}/>
            </Routes>
        </Router>
    );
};

export default AdminApp;
