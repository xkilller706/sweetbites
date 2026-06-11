// Cargar comentarios de una receta
async function loadComments(recipeId) {
    try {
        const response = await fetchAPI(`/comments/${recipeId}`);
        if (response.success) {
            displayComments(response.comments);
        }
    } catch (error) {
        console.error('Error al cargar comentarios:', error);
    }
}

// Mostrar comentarios
function displayComments(comments) {
    const list = document.getElementById('commentsList');
    if (!list) return;

    if (comments.length === 0) {
        list.innerHTML = '<p class="text-gray-500 text-center py-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>';
        return;
    }

    list.innerHTML = comments.map(comment => `
        <div class="border-b pb-4 mb-4">
            <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 bg-rosa-vivo text-white rounded-full flex items-center justify-center font-bold">
                    ${comment.usuario.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p class="font-semibold">${comment.usuario}</p>
                    <p class="text-xs text-gray-500">${new Date(comment.fecha).toLocaleDateString()}</p>
                </div>
            </div>
            <p class="text-gray-700 ml-13">${comment.comentario}</p>
        </div>
    `).join('');
}

// Agregar comentario
async function submitComment() {
    const recipeId = getURLParameter('id');
    const commentText = document.getElementById('commentText');

    if (!commentText || !commentText.value.trim()) {
        showToast('Escribe un comentario primero', 'error');
        return;
    }

    if (!isAuthenticated()) {
        showToast('Debes iniciar sesión para comentar', 'error');
        return;
    }

    try {
        const response = await fetchAPI(`/comments/${recipeId}`, 'POST', {
            comentario: commentText.value
        });

        if (response.success) {
            showToast('Comentario publicado');
            commentText.value = '';
            loadComments(recipeId);
        }
    } catch (error) {
        showToast(error.message || 'Error al publicar comentario', 'error');
    }
}

// Valorar receta con estrellas
let selectedRating = 0;

function setRating(rating) {
    selectedRating = rating;

    // Actualizar visualmente las estrellas
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('text-gray-300');
            star.classList.add('text-yellow-400');
        } else {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-300');
        }
    });

    // Enviar valoración
    submitRating(rating);
}

// Enviar valoración
async function submitRating(puntuacion) {
    const recipeId = getURLParameter('id');

    if (!isAuthenticated()) {
        showToast('Debes iniciar sesión para valorar', 'error');
        return;
    }

    try {
        const response = await fetchAPI(`/comments/rate/${recipeId}`, 'POST', { puntuacion });

        if (response.success) {
            showToast(`¡Valoraste con ${puntuacion} estrellas!`);
            // Recargar la página para actualizar el promedio
            setTimeout(() => location.reload(), 1500);
        }
    } catch (error) {
        showToast(error.message || 'Error al valorar receta', 'error');
    }
}
