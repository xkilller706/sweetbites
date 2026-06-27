const bcrypt = require('bcryptjs');
const db = require('./config/database');

// Configuración del nuevo admin
const nuevoAdmin = {
    nombre: 'Admin Principal',
    email: 'admin@sweetbites.com',
    password: 'Admin123@', // Cambia esto por la contraseña que quieras
    telefono: '3001234567', // Opcional
};

async function crearAdmin() {
    try {
        console.log('🔐 Creando usuario administrador...\n');

        // Verificar si el email ya existe
        const [existente] = await db.execute(
            'SELECT id, email FROM users WHERE email = ?',
            [nuevoAdmin.email]
        );

        let result;

        if (existente.length > 0) {
            console.log('⚠️  Ya existe un usuario con el email:', nuevoAdmin.email);
            console.log('   Actualizando contraseña del usuario existente...\n');

            // Hashear la nueva contraseña
            console.log('⏳ Hasheando contraseña...');
            const passwordHash = await bcrypt.hash(nuevoAdmin.password, 10);

            // Actualizar usuario existente
            await db.execute(
                `UPDATE users
                 SET nombre = ?, password_hash = ?, telefono = ?, rol = 'admin'
                 WHERE email = ?`,
                [nuevoAdmin.nombre, passwordHash, nuevoAdmin.telefono, nuevoAdmin.email]
            );

            result = { insertId: existente[0].id };
        } else {
            // Hashear la contraseña
            console.log('⏳ Hasheando contraseña...');
            const passwordHash = await bcrypt.hash(nuevoAdmin.password, 10);

            // Insertar usuario admin
            const [insertResult] = await db.execute(
                `INSERT INTO users (nombre, email, password_hash, telefono, rol)
                 VALUES (?, ?, ?, ?, 'admin')`,
                [nuevoAdmin.nombre, nuevoAdmin.email, passwordHash, nuevoAdmin.telefono]
            );

            result = insertResult;
        }

        console.log('\n✅ ¡Usuario administrador creado exitosamente!\n');
        console.log('📋 Detalles del usuario:');
        console.log('   ID:', result.insertId);
        console.log('   Nombre:', nuevoAdmin.nombre);
        console.log('   Email:', nuevoAdmin.email);
        console.log('   Password:', nuevoAdmin.password);
        console.log('   Rol: admin');
        console.log('\n🔑 Ahora puedes iniciar sesión con estas credenciales.\n');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error al crear administrador:', error.message);
        process.exit(1);
    }
}

// Ejecutar
crearAdmin();
