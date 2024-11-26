const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // El token va en el header Authorization: Bearer <token>

    if (!token) return res.status(401).json({ message: 'Acceso denegado, se requiere autenticación' });

    try {
        const verified = jwt.verify(token, 'tu_secreto_jwt');
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token no válido' });
    }
}

module.exports = authenticateToken;
