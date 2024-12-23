import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contacto';
import AppointmentsPage from './pages/AppointmentsPage';
import NewAppointmentPage from './pages/NewAppointmentPage';
import DoctorsPage from './pages/DoctorsPage';
import MyprofilePage from './pages/MyprofilePage';
import ProtectedRoute from './components/Protectedroute';


function App() {
    return (
            <Router>
                <div className='mx-4 sm:mx-[10%]'>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/doctores" element={<DoctorsPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/appointments" element={<ProtectedRoute> <AppointmentsPage/> </ProtectedRoute>}/>
                        <Route path="/appointments/new" element={<ProtectedRoute> <NewAppointmentPage /> </ProtectedRoute>} />
                        <Route path="/MyprofilePage" element={<ProtectedRoute> <MyprofilePage/> </ProtectedRoute>}/>
                    </Routes>
                    <Footer/>
                </div> 
            </Router>
    );
}

export default App;
