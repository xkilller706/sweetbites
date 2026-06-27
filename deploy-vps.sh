#!/bin/bash

# =====================================================
# SCRIPT DE DESPLIEGUE AUTOMATIZADO - SWEETBITES
# =====================================================
# VPS: Contabo (185.245.182.220)
# Dominio: sweetbites.proyectoscampus.top
# =====================================================

echo "======================================"
echo "🍰 DEPLOY SWEETBITES EN VPS CONTABO 🍰"
echo "======================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# =====================================================
# PASO 1: Verificar que estamos en el directorio correcto
# =====================================================
echo -e "${YELLOW}📁 PASO 1: Verificando ubicación...${NC}"
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Error: No se encuentra docker-compose.yml${NC}"
    echo -e "${RED}   Debes ejecutar este script desde /var/www/sweetbites${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Ubicación correcta${NC}"
echo ""

# =====================================================
# PASO 2: Verificar que existe archivo .env
# =====================================================
echo -e "${YELLOW}🔐 PASO 2: Verificando archivo .env...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Error: No existe archivo .env${NC}"
    echo -e "${YELLOW}   Creando archivo .env...${NC}"

    cat > .env << 'EOF'
# Base de Datos
DB_ROOT_PASSWORD=cKwSFbfB71O8QLKR+/YHraBiV4HaDOCF2gp3xaQTAJA=
DB_NAME=sweetbites_db
DB_USER=sweetbites_user
DB_PASSWORD=zckMDAFuR58LBrPfaI+5MnDl9r94XuC+oED+93sc95k=

# JWT Secret
JWT_SECRET=c3Vmt9SGRIaBpnb1yKsVoDZHYhSePOcdPnG5icMugmnwt4e5DsJS2I6kHj0/oGMO

# Puerto del Backend
PORT=3000
EOF

    echo -e "${GREEN}✅ Archivo .env creado${NC}"
else
    echo -e "${GREEN}✅ Archivo .env existe${NC}"
fi
echo ""

# =====================================================
# PASO 3: Detener contenedores anteriores (si existen)
# =====================================================
echo -e "${YELLOW}🛑 PASO 3: Deteniendo contenedores anteriores...${NC}"
docker compose down 2>/dev/null || echo "   No hay contenedores previos"
echo -e "${GREEN}✅ Contenedores detenidos${NC}"
echo ""

# =====================================================
# PASO 4: Construir y levantar contenedores
# =====================================================
echo -e "${YELLOW}🐳 PASO 4: Construyendo y levantando contenedores...${NC}"
docker compose up -d --build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Contenedores levantados correctamente${NC}"
else
    echo -e "${RED}❌ Error al levantar contenedores${NC}"
    exit 1
fi
echo ""

# =====================================================
# PASO 5: Esperar a que los contenedores estén listos
# =====================================================
echo -e "${YELLOW}⏳ PASO 5: Esperando a que los servicios estén listos...${NC}"
sleep 10
echo -e "${GREEN}✅ Servicios iniciados${NC}"
echo ""

# =====================================================
# PASO 6: Verificar estado de contenedores
# =====================================================
echo -e "${YELLOW}📊 PASO 6: Verificando estado de contenedores...${NC}"
echo ""
docker ps --filter "name=sweetbites" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

# Verificar que los 3 contenedores estén corriendo
RUNNING_CONTAINERS=$(docker ps --filter "name=sweetbites" --format "{{.Names}}" | wc -l)

if [ "$RUNNING_CONTAINERS" -eq 3 ]; then
    echo -e "${GREEN}✅ Los 3 contenedores están corriendo${NC}"
else
    echo -e "${RED}⚠️  Solo $RUNNING_CONTAINERS contenedores corriendo (deberían ser 3)${NC}"
fi
echo ""

# =====================================================
# PASO 7: Verificar logs de backend
# =====================================================
echo -e "${YELLOW}📝 PASO 7: Verificando logs del backend...${NC}"
echo ""
docker logs sweetbites-backend --tail 20
echo ""

# =====================================================
# PASO 8: Probar conectividad interna
# =====================================================
echo -e "${YELLOW}🔌 PASO 8: Probando conectividad interna...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:80)

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 304 ]; then
    echo -e "${GREEN}✅ Frontend responde correctamente (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend responde con código HTTP $HTTP_CODE${NC}"
fi
echo ""

# =====================================================
# RESUMEN FINAL
# =====================================================
echo "======================================"
echo -e "${GREEN}✅ DESPLIEGUE COMPLETADO${NC}"
echo "======================================"
echo ""
echo "📋 SIGUIENTE PASO:"
echo "   Configurar Nginx en el VPS si aún no está hecho"
echo ""
echo "📄 Archivo de configuración Nginx:"
echo "   /etc/nginx/sites-available/sweetbites.proyectoscampus.top"
echo ""
echo "🔐 Generar certificado SSL:"
echo "   certbot --nginx -d sweetbites.proyectoscampus.top"
echo ""
echo "🌐 URL de acceso:"
echo "   https://sweetbites.proyectoscampus.top"
echo ""
echo "📊 Comandos útiles:"
echo "   docker ps                    # Ver contenedores"
echo "   docker logs sweetbites-backend -f   # Ver logs backend"
echo "   docker logs sweetbites-frontend -f  # Ver logs frontend"
echo "   docker compose restart       # Reiniciar todos"
echo ""
echo "======================================"
