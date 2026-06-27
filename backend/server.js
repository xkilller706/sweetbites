const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
// CORS configurado para desarrollo local y producción
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman, curl, o apps móviles)
    if (!origin) return callback(null, true);

    // Lista de orígenes permitidos
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://sweetbites.proyectoscampus.top'
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Temporalmente permitir todos en desarrollo
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar rutas
const authRoutes = require('./routes/auth');
const recipesRoutes = require('./routes/recipes');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const adminRoutes = require('./routes/admin');
const categoriesRoutes = require('./routes/categories');
const notificationsRoutes = require('./routes/notifications');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/notifications', notificationsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: '🍰 Bienvenido a SweetBites API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            recipes: '/api/recipes',
            users: '/api/users',
            comments: '/api/comments'
        }
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
╠═══════════════════════════════════════╣
║   Puerto: ${PORT}                        ║
║   Entorno: Desarrollo                 ║
║   URL: http://localhost:${PORT}          ║
╚═══════════════════════════════════════╝
    `);
});

module.exports = app;
