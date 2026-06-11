# 🚀 INICIO RÁPIDO - SWEETBITES

## ⚡ 3 PASOS PARA TENER TODO FUNCIONANDO

---

## PASO 1: EJECUTAR SCRIPTS SQL (5 minutos)

### 1.1 Reparar Notificaciones (URGENTE - Elimina errores)
1. Abre: `INSTRUCCIONES_REPARAR_NOTIFICACIONES.md`
2. Sigue TODOS los pasos
3. Ejecuta el SQL en phpMyAdmin
4. **Reinicia backend** (Ctrl+C, luego npm run dev)

### 1.2 Agregar Recetas Especiales (Opcional pero recomendado)
1. Abre phpMyAdmin: http://localhost/phpmyadmin
2. Selecciona base de datos: `sweetbites_db`
3. Click en pestaña "SQL"
4. Abre el archivo: `database/add_special_recipes_fields.sql`
5. Copia TODO el contenido
6. Pégalo en phpMyAdmin
7. Click en "Continuar"
8. **Reinicia backend** (Ctrl+C, luego npm run dev)

---

## PASO 2: VERIFICAR SERVIDORES (2 minutos)

### 2.1 XAMPP
- ✅ MySQL corriendo (botón verde)
- ✅ Apache corriendo (botón verde)

### 2.2 Backend
```bash
cd backend
npm run dev
```
Deberías ver:
```
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
║   Puerto: 3000                        ║
╚═══════════════════════════════════════╝
✅ Conexión exitosa a MySQL
```

### 2.3 Frontend
```bash
cd frontend
npm run dev
```
Deberías ver:
```
VITE ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

## PASO 3: PROBAR FUNCIONALIDADES (10 minutos)

### 3.1 Probar Notificaciones ✅
1. Ir a: http://localhost:5173
2. Login como: maria@sweetbites.com / password123
3. Crear una receta
4. Logout
5. Login como: admin@sweetbites.com / password123
6. Panel Admin > Aprobar Recetas
7. Aprobar la receta
8. Logout
9. Login como: maria@sweetbites.com / password123
10. Click en campanita 🔔
11. **RESULTADO**: Deberías ver notificación de "Receta aprobada" ✅

### 3.2 Probar Sesión de Usuario ✅
1. Login como: juan@sweetbites.com / password123
2. Verifica que dice "Juan" en navbar
3. Logout
4. Login como: maria@sweetbites.com / password123
5. **RESULTADO**: Debe decir "María" (no Juan) ✅

### 3.3 Probar Imágenes ✅
1. Login
2. Crear Receta > Subir imagen
3. Completar y enviar
4. Login como admin > Aprobar receta
5. Ir a lista pública de recetas
6. **RESULTADO**: Imagen se muestra correctamente ✅

### 3.4 Probar Cambio de Contraseña ✅
1. Login
2. Ir a Perfil
3. Click "Cambiar Contraseña"
4. Ingresar:
   - Actual: password123
   - Nueva: nuevapass123
   - Confirmar: nuevapass123
5. Guardar
6. Logout
7. Login con nueva contraseña
8. **RESULTADO**: Login exitoso ✅

---

## ✅ CHECKLIST RÁPIDO

- [ ] XAMPP corriendo (MySQL + Apache verde)
- [ ] Script SQL de notificaciones ejecutado
- [ ] Script SQL de recetas especiales ejecutado (opcional)
- [ ] Backend corriendo (puerto 3000)
- [ ] Frontend corriendo (puerto 5173)
- [ ] Notificaciones funcionan sin errores
- [ ] Sesión de usuario cambia correctamente
- [ ] Imágenes se muestran en recetas
- [ ] Cambio de contraseña funciona

---

## 🆘 SI ALGO NO FUNCIONA

### Error de notificaciones persiste
→ Lee: `INSTRUCCIONES_REPARAR_NOTIFICACIONES.md`

### Sesión no cambia
→ Cierra TODAS las pestañas del navegador
→ F12 > Application > Local Storage > Clear
→ Ctrl+Shift+R para recargar

### Imágenes no se ven
→ Verifica que backend está en puerto 3000
→ Verifica que existe carpeta: backend/uploads/recipes/

### Cambio de contraseña falla
→ F12 > Console > Busca errores en rojo
→ Verifica contraseña actual correcta

---

## 📚 DOCUMENTACIÓN COMPLETA

Para más detalles, consulta:
- `RESUMEN_IMPLEMENTACION_COMPLETA.md` - TODO lo implementado
- `INSTRUCCIONES_REPARAR_NOTIFICACIONES.md` - Paso a paso notificaciones
- `README.md` - Documentación general del proyecto

---

## 🎉 ¡LISTO!

Si completaste los 3 pasos y el checklist, tu aplicación está **100% funcional** ✅🍰

**Usuarios de prueba**:
- Admin: admin@sweetbites.com / password123
- Usuario: maria@sweetbites.com / password123
- Usuario: juan@sweetbites.com / password123

**URLs importantes**:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- phpMyAdmin: http://localhost/phpmyadmin

---

**¡Disfruta tu aplicación SweetBites completa!** 🚀
