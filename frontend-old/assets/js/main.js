// Configuración de la API
const API_URL = 'http://localhost:3000/api';

// Obtener token del localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Guardar token en localStorage
function saveToken(token) {
    localStorage.setItem('token', token);
}

// Eliminar token
function removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// Obtener datos del usuario
function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Guardar datos del usuario
function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Verificar si el usuario está autenticado
function isAuthenticated() {
    return !!getToken();
}

// Función para hacer peticiones a la API
async function fetchAPI(endpoint, method = 'GET', body = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Agregar token si está autenticado
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Agregar body si existe
    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en la petición');
        }

        return data;
    } catch (error) {
        console.error('Error en fetchAPI:', error);
        throw error;
    }
}

// Mostrar notificación toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('hidden');

    // Color según tipo
    if (type === 'error') {
        toast.classList.add('bg-red-500', 'text-white');
    } else {
        toast.classList.add('bg-green-500', 'text-white');
    }

    // Ocultar después de 3 segundos
    setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('bg-red-500', 'bg-green-500', 'text-white');
    }, 3000);
}

// Cerrar sesión
function logout() {
    removeToken();
    showToast('Sesión cerrada exitosamente');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Actualizar UI según estado de autenticación
function updateAuthUI() {
    const isAuth = isAuthenticated();
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const favoritesLink = document.getElementById('favoritesLink');
    const profileLink = document.getElementById('profileLink');

    if (loginBtn && logoutBtn) {
        if (isAuth) {
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            if (favoritesLink) favoritesLink.classList.remove('hidden');
            if (profileLink) profileLink.classList.remove('hidden');
        } else {
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            if (favoritesLink) favoritesLink.classList.add('hidden');
            if (profileLink) profileLink.classList.add('hidden');
        }
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});

// Formatear tiempo
function formatTime(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

// Obtener parámetros de URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
