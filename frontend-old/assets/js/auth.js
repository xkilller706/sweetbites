// Manejar login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetchAPI('/auth/login', 'POST', { email, password });

        if (response.success) {
            // Guardar token y datos del usuario
            saveToken(response.token);
            saveUser(response.user);

            showToast('¡Bienvenido de vuelta!');

            // Redirigir al catálogo
            setTimeout(() => {
                window.location.href = 'recipes.html';
            }, 1000);
        }
    } catch (error) {
        showToast(error.message || 'Error al iniciar sesión', 'error');
    }
}

// Manejar registro
async function handleRegister(event) {
    event.preventDefault();

    const nombre = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const telefono = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

    // Validar que las contraseñas coincidan
    if (password !== passwordConfirm) {
        showToast('Las contraseñas no coinciden', 'error');
        return;
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
        showToast('La contraseña debe tener mínimo 8 caracteres', 'error');
        return;
    }

    try {
        const response = await fetchAPI('/auth/register', 'POST', {
            nombre,
            email,
            telefono,
            password
        });

        if (response.success) {
            showToast('¡Registro exitoso! Ahora puedes iniciar sesión');

            // Cambiar a pestaña de login después de 1.5 segundos
            setTimeout(() => {
                document.getElementById('loginTab').click();
                // Prellenar el email
                document.getElementById('loginEmail').value = email;
            }, 1500);
        }
    } catch (error) {
        showToast(error.message || 'Error al registrarse', 'error');
    }
}
