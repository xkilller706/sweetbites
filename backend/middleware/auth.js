const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. No se proporcionó token.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(403).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};

// Middleware para verificar si el usuario es admin
const verifyAdmin = (req, res, next) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Solo administradores.'
        });
    }
    next();
};

// Middleware para verificar si el usuario es editor o admin
const verifyEditor = (req, res, next) => {
    if (req.user.rol !== 'editor' && req.user.rol !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Solo editores o administradores.'
        });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin, verifyEditor };
