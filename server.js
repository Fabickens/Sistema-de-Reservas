const express = require('express');
const app = express();
// Importar las rutas para CRUD
const userRoutes = require('./routes/userRoutes'); 
const appointmentRoutes = require('./routes/appointmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const medicalHistoryRoutes = require('./routes/medicalHistoryRoutes');
const specialtyRoutes = require('./routes/specialtyRoutes');



// Middleware para procesar datos JSON
app.use(express.json());

// Usar las rutas bajo el prefijo /api
app.use('/api', userRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', notificationRoutes);
app.use('/api', medicalHistoryRoutes);
app.use('/api', specialtyRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
