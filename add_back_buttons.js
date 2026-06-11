// Script para agregar BackButton a páginas
const fs = require('fs');
const path = require('path');

const files = [
  'frontend/src/pages/public/RecipeDetail.jsx',
  'frontend/src/pages/user/Profile.jsx',
  'frontend/src/pages/user/CreateRecipe_WIZARD.jsx',
  'frontend/src/pages/user/EditRecipe.jsx',
  'frontend/src/pages/user/MyRecipes.jsx',
  'frontend/src/pages/user/Favorites.jsx',
  'frontend/src/pages/user/CollectionDetail.jsx',
  'frontend/src/pages/admin/Categories.jsx',
  'frontend/src/pages/admin/RecipeManagement.jsx',
  'frontend/src/pages/admin/RecipeApproval.jsx'
];

const importStatement = "import BackButton from '@components/common/BackButton'\n";
const backButtonJSX = '      <BackButton />\n';

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ No existe: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Agregar import si no existe
  if (!content.includes("import BackButton")) {
    const lastImportIndex = content.lastIndexOf("import ");
    const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
    content = content.slice(0, endOfLastImport) + importStatement + content.slice(endOfLastImport);
  }

  // Agregar BackButton después del primer <div en el return
  if (!content.includes("<BackButton")) {
    const returnIndex = content.indexOf("return (");
    if (returnIndex !== -1) {
      const firstDivAfterReturn = content.indexOf("<div", returnIndex);
      const endOfFirstDivTag = content.indexOf(">", firstDivAfterReturn) + 1;
      const nextLineIndex = content.indexOf('\n', endOfFirstDivTag) + 1;

      content = content.slice(0, nextLineIndex) + backButtonJSX + content.slice(nextLineIndex);
    }
  }

  fs.writeFileSync(fullPath, content);
  console.log(`✅ Actualizado: ${filePath}`);
});

console.log('\n✅ Todos los botones agregados!');
