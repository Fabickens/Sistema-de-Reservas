const jwt = require('jsonwebtoken');

// Middleware para autenticar el token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado: Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Acceso denegado: Token inválido' });
        }
        console.log('Token recibido:', token);
        req.user = user; // Almacenar los datos del usuario en la solicitud
        next();
    });
};

// Middleware para autorizar según el rol
function authorizeRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta funcionalidad.' });
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRole };
