-- Fix SQL Mode para compatibilidad con GROUP BY
-- MySQL 8.0 tiene sql_mode=only_full_group_by activo por defecto

-- Ver modo actual
SELECT @@GLOBAL.sql_mode;

-- Remover ONLY_FULL_GROUP_BY del modo global
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

-- Remover ONLY_FULL_GROUP_BY del modo de sesión
SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

-- Verificar cambio
SELECT @@GLOBAL.sql_mode;
