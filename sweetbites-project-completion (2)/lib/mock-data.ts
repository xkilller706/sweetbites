import { Category, Recipe, User } from './types'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Tortas',
    icon: '🎂',
    color: '#6BD080',
    description: 'Deliciosas tortas para toda ocasion'
  },
  {
    id: '2',
    name: 'Galletas',
    icon: '🍪',
    color: '#A4C3B2',
    description: 'Galletas crujientes y suaves'
  },
  {
    id: '3',
    name: 'Chocolates',
    icon: '🍫',
    color: '#D4A5D4',
    description: 'Postres de chocolate irresistibles'
  },
  {
    id: '4',
    name: 'Postres Frios',
    icon: '🍨',
    color: '#B5C7E8',
    description: 'Helados, mousses y mas'
  },
  {
    id: '5',
    name: 'Pasteles',
    icon: '🥧',
    color: '#F5DBA5',
    description: 'Pasteles tradicionales y modernos'
  },
  {
    id: '6',
    name: 'Cupcakes',
    icon: '🧁',
    color: '#F5B5C7',
    description: 'Pequeños pero deliciosos'
  }
]

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Brownie de Chocolate Intenso',
    description: 'Delicioso brownie casero con trozos de chocolate y nueces, textura humeda por dentro y crujiente por fuera.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop',
    category: categories[2],
    difficulty: 'facil',
    time: 45,
    servings: 8,
    ingredients: [
      { id: '1', name: 'chocolate oscuro', quantity: 200, unit: 'g' },
      { id: '2', name: 'mantequilla', quantity: 100, unit: 'g' },
      { id: '3', name: 'azucar', quantity: 150, unit: 'g' },
      { id: '4', name: 'huevos', quantity: 3, unit: 'unidades' },
      { id: '5', name: 'harina', quantity: 80, unit: 'g' },
      { id: '6', name: 'nueces', quantity: 50, unit: 'g' }
    ],
    steps: [
      { id: '1', number: 1, description: 'Derretir el chocolate con la mantequilla a bano maria, revolviendo constantemente hasta obtener una mezcla homogenea.' },
      { id: '2', number: 2, description: 'Batir los huevos con el azucar hasta que la mezcla este espumosa y haya duplicado su volumen.' },
      { id: '3', number: 3, description: 'Incorporar el chocolate derretido a la mezcla de huevos, mezclando con movimientos envolventes.' },
      { id: '4', number: 4, description: 'Agregar la harina tamizada y mezclar suavemente hasta integrar.' },
      { id: '5', number: 5, description: 'Anadir las nueces picadas y verter en un molde engrasado de 20x20 cm.' },
      { id: '6', number: 6, description: 'Hornear a 180°C durante 25-30 minutos. El centro debe quedar ligeramente humedo.' }
    ],
    rating: 4.8,
    ratingCount: 124,
    favoriteCount: 89,
    status: 'publicada',
    authorId: '1',
    authorName: 'Maria Garcia',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Cheesecake de Fresas',
    description: 'Cremoso cheesecake con base de galleta y cobertura de fresas frescas. Perfecto para celebraciones especiales.',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
    category: categories[3],
    difficulty: 'intermedio',
    time: 90,
    servings: 12,
    ingredients: [
      { id: '1', name: 'galletas maria', quantity: 200, unit: 'g' },
      { id: '2', name: 'mantequilla derretida', quantity: 80, unit: 'g' },
      { id: '3', name: 'queso crema', quantity: 500, unit: 'g' },
      { id: '4', name: 'azucar', quantity: 150, unit: 'g' },
      { id: '5', name: 'crema de leche', quantity: 200, unit: 'ml' },
      { id: '6', name: 'fresas frescas', quantity: 300, unit: 'g' },
      { id: '7', name: 'gelatina sin sabor', quantity: 15, unit: 'g' }
    ],
    steps: [
      { id: '1', number: 1, description: 'Triturar las galletas hasta obtener un polvo fino y mezclar con la mantequilla derretida.' },
      { id: '2', number: 2, description: 'Presionar la mezcla en el fondo de un molde desmontable de 24 cm. Refrigerar 30 minutos.' },
      { id: '3', number: 3, description: 'Batir el queso crema con el azucar hasta obtener una crema suave.' },
      { id: '4', number: 4, description: 'Hidratar la gelatina en 50ml de agua fria y luego disolver a bano maria.' },
      { id: '5', number: 5, description: 'Incorporar la crema de leche batida y la gelatina disuelta a la mezcla de queso.' },
      { id: '6', number: 6, description: 'Verter sobre la base de galleta y refrigerar 4 horas o hasta que este firme.' },
      { id: '7', number: 7, description: 'Decorar con fresas frescas antes de servir.' }
    ],
    rating: 4.9,
    ratingCount: 89,
    favoriteCount: 156,
    status: 'publicada',
    authorId: '2',
    authorName: 'Carlos Rodriguez',
    createdAt: '2026-02-20T14:30:00Z'
  },
  {
    id: '3',
    title: 'Galletas de Avena y Chocolate',
    description: 'Galletas saludables con avena, chocolate chips y un toque de canela. Crujientes por fuera, suaves por dentro.',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop',
    category: categories[1],
    difficulty: 'facil',
    time: 30,
    servings: 24,
    ingredients: [
      { id: '1', name: 'avena', quantity: 150, unit: 'g' },
      { id: '2', name: 'harina integral', quantity: 100, unit: 'g' },
      { id: '3', name: 'azucar morena', quantity: 100, unit: 'g' },
      { id: '4', name: 'mantequilla', quantity: 100, unit: 'g' },
      { id: '5', name: 'huevo', quantity: 1, unit: 'unidad' },
      { id: '6', name: 'chocolate chips', quantity: 100, unit: 'g' },
      { id: '7', name: 'canela', quantity: 1, unit: 'cucharadita' }
    ],
    steps: [
      { id: '1', number: 1, description: 'Precalentar el horno a 175°C y forrar una bandeja con papel manteca.' },
      { id: '2', number: 2, description: 'Batir la mantequilla con el azucar hasta obtener una crema.' },
      { id: '3', number: 3, description: 'Agregar el huevo y batir hasta integrar.' },
      { id: '4', number: 4, description: 'Incorporar la avena, harina, canela y mezclar bien.' },
      { id: '5', number: 5, description: 'Anadir los chips de chocolate y mezclar.' },
      { id: '6', number: 6, description: 'Formar bolitas y aplanar ligeramente sobre la bandeja.' },
      { id: '7', number: 7, description: 'Hornear 12-15 minutos hasta que los bordes esten dorados.' }
    ],
    rating: 4.6,
    ratingCount: 67,
    favoriteCount: 45,
    status: 'publicada',
    authorId: '3',
    authorName: 'Ana Martinez',
    createdAt: '2026-03-05T09:15:00Z'
  },
  {
    id: '4',
    title: 'Torta Tres Leches',
    description: 'Clasica torta tres leches, esponjosa y humeda, banada en tres tipos de leche y decorada con merengue.',
    imageUrl: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&h=400&fit=crop',
    category: categories[0],
    difficulty: 'intermedio',
    time: 120,
    servings: 16,
    ingredients: [
      { id: '1', name: 'harina', quantity: 200, unit: 'g' },
      { id: '2', name: 'huevos', quantity: 6, unit: 'unidades' },
      { id: '3', name: 'azucar', quantity: 200, unit: 'g' },
      { id: '4', name: 'leche evaporada', quantity: 400, unit: 'ml' },
      { id: '5', name: 'leche condensada', quantity: 400, unit: 'ml' },
      { id: '6', name: 'crema de leche', quantity: 200, unit: 'ml' },
      { id: '7', name: 'vainilla', quantity: 1, unit: 'cucharadita' }
    ],
    steps: [
      { id: '1', number: 1, description: 'Batir los huevos con el azucar hasta triplicar el volumen (15 minutos aprox).' },
      { id: '2', number: 2, description: 'Incorporar la harina tamizada con movimientos envolventes.' },
      { id: '3', number: 3, description: 'Verter en un molde engrasado y hornear a 180°C por 30 minutos.' },
      { id: '4', number: 4, description: 'Mezclar las tres leches con la vainilla.' },
      { id: '5', number: 5, description: 'Pinchar el bizcocho frio con un tenedor y banar con la mezcla de leches.' },
      { id: '6', number: 6, description: 'Refrigerar por lo menos 4 horas o toda la noche.' },
      { id: '7', number: 7, description: 'Decorar con merengue o crema batida antes de servir.' }
    ],
    rating: 4.9,
    ratingCount: 234,
    favoriteCount: 312,
    status: 'publicada',
    authorId: '1',
    authorName: 'Maria Garcia',
    createdAt: '2026-01-28T16:45:00Z'
  },
  {
    id: '5',
    title: 'Mousse de Maracuya',
    description: 'Ligero y refrescante mousse de maracuya con base de galleta. Ideal para dias calurosos.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
    category: categories[3],
    difficulty: 'facil',
    time: 40,
    servings: 6,
    ingredients: [
      { id: '1', name: 'pulpa de maracuya', quantity: 200, unit: 'ml' },
      { id: '2', name: 'crema de leche', quantity: 300, unit: 'ml' },
      { id: '3', name: 'azucar', quantity: 100, unit: 'g' },
      { id: '4', name: 'gelatina sin sabor', quantity: 10, unit: 'g' },
      { id: '5', name: 'claras de huevo', quantity: 2, unit: 'unidades' }
    ],
    steps: [
      { id: '1', number: 1, description: 'Hidratar la gelatina en 50ml de agua fria por 5 minutos.' },
      { id: '2', number: 2, description: 'Calentar la pulpa de maracuya con el azucar y disolver la gelatina en esta mezcla.' },
      { id: '3', number: 3, description: 'Dejar enfriar hasta que empiece a espesar.' },
      { id: '4', number: 4, description: 'Batir la crema de leche hasta punto chantilly.' },
      { id: '5', number: 5, description: 'Incorporar la crema batida a la mezcla de maracuya con movimientos envolventes.' },
      { id: '6', number: 6, description: 'Servir en copas individuales y refrigerar 2 horas antes de servir.' }
    ],
    rating: 4.7,
    ratingCount: 45,
    favoriteCount: 67,
    status: 'publicada',
    authorId: '4',
    authorName: 'Pedro Sanchez',
    createdAt: '2026-03-12T11:20:00Z'
  },
  {
    id: '6',
    title: 'Red Velvet Cupcakes',
    description: 'Esponjosos cupcakes red velvet con frosting de queso crema. Un clasico americano irresistible.',
    imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=400&fit=crop',
    category: categories[5],
    difficulty: 'intermedio',
    time: 50,
    servings: 12,
    ingredients: [
      { id: '1', name: 'harina', quantity: 150, unit: 'g' },
      { id: '2', name: 'cacao en polvo', quantity: 15, unit: 'g' },
      { id: '3', name: 'colorante rojo', quantity: 30, unit: 'ml' },
      { id: '4', name: 'mantequilla', quantity: 100, unit: 'g' },
      { id: '5', name: 'azucar', quantity: 150, unit: 'g' },
      { id: '6', name: 'huevos', quantity: 2, unit: 'unidades' },
      { id: '7', name: 'queso crema', quantity: 200, unit: 'g' },
      { id: '8', name: 'azucar glass', quantity: 200, unit: 'g' }
    ],
    steps: [
      { id: '1', number: 1, description: 'Precalentar el horno a 175°C y preparar moldes para cupcakes.' },
      { id: '2', number: 2, description: 'Mezclar la harina con el cacao en polvo y una pizca de sal.' },
      { id: '3', number: 3, description: 'Batir la mantequilla con el azucar, agregar los huevos uno a uno.' },
      { id: '4', number: 4, description: 'Incorporar el colorante rojo y la vainilla.' },
      { id: '5', number: 5, description: 'Anadir los ingredientes secos alternando con buttermilk.' },
      { id: '6', number: 6, description: 'Hornear 18-20 minutos. Dejar enfriar completamente.' },
      { id: '7', number: 7, description: 'Preparar el frosting batiendo queso crema con azucar glass y decorar.' }
    ],
    rating: 4.8,
    ratingCount: 98,
    favoriteCount: 134,
    status: 'publicada',
    authorId: '2',
    authorName: 'Carlos Rodriguez',
    createdAt: '2026-02-14T13:00:00Z'
  }
]

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Maria Garcia',
    email: 'maria@email.com',
    phone: '300 123 4567',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Carlos Rodriguez',
    email: 'carlos@email.com',
    phone: '301 234 5678',
    role: 'editor',
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Ana Martinez',
    email: 'ana@email.com',
    role: 'usuario',
    createdAt: '2026-02-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Pedro Sanchez',
    email: 'pedro@email.com',
    role: 'usuario',
    createdAt: '2026-02-20T00:00:00Z'
  }
]

export const pendingRecipes: Recipe[] = [
  {
    id: '7',
    title: 'Flan de Caramelo Casero',
    description: 'Tradicional flan de caramelo con textura sedosa y caramelo perfecto. Receta de la abuela.',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
    category: categories[3],
    difficulty: 'intermedio',
    time: 75,
    servings: 8,
    ingredients: [
      { id: '1', name: 'leche', quantity: 500, unit: 'ml' },
      { id: '2', name: 'huevos', quantity: 4, unit: 'unidades' },
      { id: '3', name: 'azucar', quantity: 200, unit: 'g' },
      { id: '4', name: 'vainilla', quantity: 1, unit: 'cucharadita' }
    ],
    steps: [
      { id: '1', number: 1, description: 'Hacer caramelo con 100g de azucar y cubrir el fondo del molde.' },
      { id: '2', number: 2, description: 'Calentar la leche sin hervir.' },
      { id: '3', number: 3, description: 'Batir los huevos con el azucar restante.' },
      { id: '4', number: 4, description: 'Agregar la leche tibia poco a poco.' },
      { id: '5', number: 5, description: 'Colar y verter sobre el caramelo.' },
      { id: '6', number: 6, description: 'Hornear a bano maria a 160°C por 1 hora.' }
    ],
    rating: 0,
    ratingCount: 0,
    favoriteCount: 0,
    status: 'pendiente',
    authorId: '3',
    authorName: 'Ana Martinez',
    createdAt: '2026-05-10T10:00:00Z'
  }
]
