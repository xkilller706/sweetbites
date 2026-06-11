// Variables globales para recetas
let allRecipes = [];
let currentRecipe = null;
let originalServings = 1;
let currentServings = 1;
let allSteps = [];
let currentStepIndex = 0;

// Cargar todas las recetas
async function loadRecipes() {
    const loading = document.getElementById('loading');
    const grid = document.getElementById('recipesGrid');
    const noResults = document.getElementById('noResults');

    if (loading) loading.classList.remove('hidden');
    if (noResults) noResults.classList.add('hidden');

    try {
        const response = await fetchAPI('/recipes');
        if (response.success) {
            allRecipes = response.recipes;
            displayRecipes(allRecipes);
        }
    } catch (error) {
        console.error('Error al cargar recetas:', error);
        if (grid) grid.innerHTML = '<p class="col-span-4 text-center text-red-500">Error al cargar recetas</p>';
    } finally {
        if (loading) loading.classList.add('hidden');
    }
}

// Obtener imagen de la receta (placeholder o real)
function getRecipeImage(recipe) {
    // Si tiene foto_principal, usarla
    if (recipe.foto_principal && !recipe.foto_principal.endsWith('.jpg')) {
        return `http://localhost:3000/uploads/recipes/${recipe.foto_principal}`;
    }

    // Sino, usar placeholder de Unsplash según categoría
    const placeholders = {
        'Tortas': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        'Galletas': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
        'Chocolates': 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop',
        'Postres Fríos': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
        'Tartas': 'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=400&h=300&fit=crop',
        'Cupcakes': 'https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=400&h=300&fit=crop',
        'Otros': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop'
    };

    return placeholders[recipe.categoria] || placeholders['Otros'];
}

// Mostrar recetas en el grid
function displayRecipes(recipes) {
    const grid = document.getElementById('recipesGrid');
    const noResults = document.getElementById('noResults');

    if (!grid) return;

    if (recipes.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.classList.remove('hidden');
        return;
    }

    if (noResults) noResults.classList.add('hidden');

    grid.innerHTML = recipes.map((recipe, index) => `
        <div class="recipe-card bg-white rounded-2xl shadow-lg overflow-hidden animate-scale-in" style="animation-delay: ${index * 0.1}s">
            <div class="recipe-image h-48 bg-gradient-to-br from-rosa-claro to-rosa-vivo overflow-hidden relative">
                <img src="${getRecipeImage(recipe)}"
                     alt="${recipe.nombre}"
                     class="w-full h-full object-cover"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="w-full h-full hidden items-center justify-center text-6xl">
                    ${getCategoryEmoji(recipe.categoria)}
                </div>
                ${recipe.total_favoritos > 20 ? '<div class="absolute top-2 right-2 bg-rosa-vivo text-white px-3 py-1 rounded-full text-xs font-bold badge-shimmer">Popular ✨</div>' : ''}
            </div>
            <div class="p-5">
                <h3 class="font-bold text-xl mb-2 text-gray-800 hover:text-rosa-vivo transition">${recipe.nombre}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${recipe.descripcion || ''}</p>
                <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span class="flex items-center gap-1">
                        <span class="text-lg">⏱️</span>
                        ${recipe.tiempo_preparacion} min
                    </span>
                    <span class="flex items-center gap-1">
                        <span class="text-lg">👨‍🍳</span>
                        ${recipe.dificultad}
                    </span>
                </div>
                <div class="flex items-center justify-between mb-4 pb-4 border-b">
                    <div class="flex items-center gap-1">
                        <span class="text-yellow-400 text-lg">⭐</span>
                        <span class="text-sm font-bold text-gray-800">${parseFloat(recipe.calificacion_promedio).toFixed(1)}</span>
                    </div>
                    <span class="text-xs text-gray-500 flex items-center gap-1">
                        <span class="text-rosa-vivo">💝</span>
                        ${recipe.total_favoritos || 0} favoritos
                    </span>
                </div>
                <a href="recipe-detail.html?id=${recipe.id}" class="block bg-gradient-to-r from-rosa-vivo to-rosa-claro text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Ver Receta →
                </a>
            </div>
        </div>
    `).join('');
}

// Obtener emoji según categoría
function getCategoryEmoji(category) {
    const emojis = {
        'Tortas': '🎂',
        'Galletas': '🍪',
        'Chocolates': '🍫',
        'Postres Fríos': '🍨',
        'Tartas': '🥧',
        'Cupcakes': '🧁',
        'Otros': '🍰'
    };
    return emojis[category] || '🍰';
}

// Aplicar filtros
async function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value;
    const category = document.getElementById('categoryFilter')?.value;
    const difficulty = document.getElementById('difficultyFilter')?.value;

    let filtered = [...allRecipes];

    // Filtrar por búsqueda
    if (searchTerm) {
        filtered = filtered.filter(r =>
            r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (r.descripcion && r.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }

    // Filtrar por categoría
    if (category) {
        filtered = filtered.filter(r => r.categoria === category);
    }

    // Filtrar por dificultad
    if (difficulty) {
        filtered = filtered.filter(r => r.dificultad === difficulty);
    }

    displayRecipes(filtered);
}

// Limpiar filtros
function clearFilters() {
    if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
    if (document.getElementById('categoryFilter')) document.getElementById('categoryFilter').value = '';
    if (document.getElementById('difficultyFilter')) document.getElementById('difficultyFilter').value = '';
    displayRecipes(allRecipes);
}

// Cargar detalle de receta
async function loadRecipeDetail() {
    const recipeId = getURLParameter('id');
    if (!recipeId) {
        window.location.href = 'recipes.html';
        return;
    }

    try {
        const response = await fetchAPI(`/recipes/${recipeId}`);
        if (response.success) {
            currentRecipe = response.recipe;
            displayRecipeDetail(currentRecipe);
            loadComments(recipeId);
        }
    } catch (error) {
        console.error('Error al cargar receta:', error);
        showToast('Error al cargar la receta', 'error');
    }
}

// Mostrar detalle de receta
function displayRecipeDetail(recipe) {
    // Header
    const header = document.getElementById('recipeHeader');
    if (header) {
        header.innerHTML = `
            <div class="mb-6">
                <div class="h-80 rounded-2xl overflow-hidden mb-6 shadow-xl">
                    <img src="${getRecipeImage(recipe)}"
                         alt="${recipe.nombre}"
                         class="w-full h-full object-cover"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="w-full h-full hidden bg-gradient-to-br from-rosa-claro to-rosa-vivo items-center justify-center text-9xl">
                        ${getCategoryEmoji(recipe.categoria)}
                    </div>
                </div>
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <span class="inline-block bg-gradient-to-r from-rosa-vivo to-rosa-claro text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                            ${recipe.categoria}
                        </span>
                        <h1 class="text-5xl font-bold text-gray-800 mb-3 leading-tight">${recipe.nombre}</h1>
                        <p class="text-gray-600 text-lg">${recipe.descripcion || ''}</p>
                        <p class="text-gray-500 text-sm mt-2">Por ${recipe.autor || 'SweetBites'}</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gradient-to-br from-rosa-claro to-rosa-vivo p-6 rounded-2xl text-center text-white shadow-lg">
                    <p class="text-sm opacity-90 mb-1">⏱️ Tiempo</p>
                    <p class="text-3xl font-bold">${recipe.tiempo_preparacion}</p>
                    <p class="text-sm opacity-90">minutos</p>
                </div>
                <div class="bg-gradient-to-br from-verde-agua to-verde-menta p-6 rounded-2xl text-center text-white shadow-lg">
                    <p class="text-sm opacity-90 mb-1">🍽️ Porciones</p>
                    <p class="text-3xl font-bold">${recipe.porciones}</p>
                    <p class="text-sm opacity-90">personas</p>
                </div>
                <div class="bg-gradient-to-br from-rosa-vivo to-red-400 p-6 rounded-2xl text-center text-white shadow-lg">
                    <p class="text-sm opacity-90 mb-1">👨‍🍳 Dificultad</p>
                    <p class="text-2xl font-bold">${recipe.dificultad}</p>
                </div>
                <div class="bg-gradient-to-br from-yellow-400 to-orange-400 p-6 rounded-2xl text-center text-white shadow-lg">
                    <p class="text-sm opacity-90 mb-1">⭐ Rating</p>
                    <p class="text-3xl font-bold">${parseFloat(recipe.calificacion_promedio).toFixed(1)}</p>
                    <p class="text-sm opacity-90">${recipe.total_valoraciones || 0} votos</p>
                </div>
            </div>
        `;
    }

    // Ingredientes
    originalServings = recipe.porciones;
    currentServings = recipe.porciones;
    if (document.getElementById('currentServings')) {
        document.getElementById('currentServings').textContent = currentServings;
    }
    displayIngredients(recipe.ingredients);

    // Pasos
    allSteps = recipe.steps;
    displaySteps(recipe.steps);

    // Mostrar secciones de comentarios y valoración si está autenticado
    if (isAuthenticated()) {
        const ratingSection = document.getElementById('ratingSection');
        const commentSection = document.getElementById('commentSection');
        if (ratingSection) ratingSection.classList.remove('hidden');
        if (commentSection) commentSection.classList.remove('hidden');
    }
}

// Mostrar ingredientes
function displayIngredients(ingredients) {
    const list = document.getElementById('ingredientsList');
    if (!list) return;

    list.innerHTML = ingredients.map(ing => {
        const adjustedQuantity = (ing.cantidad * currentServings / originalServings).toFixed(1);
        return `
            <li class="flex justify-between items-center py-2 border-b">
                <span>${ing.nombre}</span>
                <span class="font-semibold ingredient-quantity" data-original="${ing.cantidad}">
                    ${adjustedQuantity} ${ing.unidad}
                </span>
            </li>
        `;
    }).join('');
}

// Ajustar porciones
function adjustServings(change) {
    currentServings += change;
    if (currentServings < 1) currentServings = 1;
    if (currentServings > 50) currentServings = 50;

    document.getElementById('currentServings').textContent = currentServings;

    // Actualizar cantidades de ingredientes
    const quantities = document.querySelectorAll('.ingredient-quantity');
    quantities.forEach(el => {
        const original = parseFloat(el.dataset.original);
        const adjusted = (original * currentServings / originalServings).toFixed(1);
        const unit = el.textContent.split(' ').slice(1).join(' ');
        el.textContent = `${adjusted} ${unit}`;
    });
}

// Mostrar pasos
function displaySteps(steps) {
    const list = document.getElementById('stepsList');
    if (!list) return;

    list.innerHTML = steps.map(step => `
        <div class="flex gap-4 p-4 bg-beige-calido rounded-lg">
            <div class="flex-shrink-0 w-10 h-10 bg-rosa-vivo text-white rounded-full flex items-center justify-center font-bold">
                ${step.numero_paso}
            </div>
            <div class="flex-1">
                <p class="text-gray-800">${step.descripcion}</p>
            </div>
        </div>
    `).join('');
}

// Modo Cocina
function startCookingMode() {
    if (!allSteps || allSteps.length === 0) return;

    currentStepIndex = 0;
    document.getElementById('cookingMode').classList.remove('hidden');
    updateCookingModeStep();

    // Intentar pantalla completa
    const elem = document.getElementById('cookingMode');
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => console.log('Fullscreen no disponible'));
    }
}

function exitCookingMode() {
    document.getElementById('cookingMode').classList.add('hidden');
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
}

function updateCookingModeStep() {
    const step = allSteps[currentStepIndex];
    document.getElementById('stepCounter').textContent = `Paso ${currentStepIndex + 1} de ${allSteps.length}`;
    document.getElementById('currentStepText').textContent = step.descripcion;

    // Deshabilitar botón anterior si es el primer paso
    document.getElementById('prevStepBtn').disabled = currentStepIndex === 0;

    // Cambiar texto del botón siguiente si es el último paso
    const nextBtn = document.getElementById('nextStepBtn');
    if (currentStepIndex === allSteps.length - 1) {
        nextBtn.textContent = '✓ Finalizar';
    } else {
        nextBtn.textContent = 'Siguiente →';
    }
}

function previousStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        updateCookingModeStep();
    }
}

function nextStep() {
    if (currentStepIndex < allSteps.length - 1) {
        currentStepIndex++;
        updateCookingModeStep();
    } else {
        showToast('¡Receta completada! 🎉');
        exitCookingMode();
    }
}

// Inicializar según la página
if (window.location.pathname.includes('recipes.html')) {
    window.addEventListener('DOMContentLoaded', loadRecipes);

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyFilters, 300);
        });
    }
}

if (window.location.pathname.includes('recipe-detail.html')) {
    window.addEventListener('DOMContentLoaded', loadRecipeDetail);
}
