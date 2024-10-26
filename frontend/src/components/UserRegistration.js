import React, { useState } from 'react';
import axios from 'axios';

const UserRegistration = () => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('paciente');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/usuarios', {
        cedula,
        nombre,
        correo,
        contraseña,
        rol,
        telefono,
      });
      alert(response.data);
    } catch (error) {
      alert('Error registrando el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder="Cédula" required />
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
      <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
      <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Contraseña" required />
      <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" required />
      <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="paciente">Paciente</option>
        <option value="doctor">Doctor</option>
        <option value="administrador">Administrador</option>
      </select>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default UserRegistration;
