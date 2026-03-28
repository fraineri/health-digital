-- CreateEnum AgniType (conversión directa desde String: valores ya son válidos como enum)
CREATE TYPE "AgniType" AS ENUM ('SAMA', 'VISHAMA', 'TIKSHNA', 'MANDA');

-- AlterTable: Convertir agniType de String a AgniType enum
ALTER TABLE "Consultation" ALTER COLUMN "agniType" TYPE "AgniType" USING "agniType"::"AgniType";

-- CreateEnum AmaLevel
CREATE TYPE "AmaLevel" AS ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH');

-- Migrar amaLevel de Int a AmaLevel Enum (conversión manual: Prisma no puede hacer Int->Enum)
-- Paso 1: Agregar columna temporal de tipo AmaLevel
ALTER TABLE "Consultation" ADD COLUMN "amaLevelNew" "AmaLevel";

-- Paso 2: Poblar la columna nueva con el mapeo de enteros a enum
UPDATE "Consultation"
SET "amaLevelNew" = CASE
  WHEN "amaLevel" = 0 THEN 'NONE'::"AmaLevel"
  WHEN "amaLevel" = 1 THEN 'LOW'::"AmaLevel"
  WHEN "amaLevel" = 2 THEN 'MEDIUM'::"AmaLevel"
  WHEN "amaLevel" = 3 THEN 'HIGH'::"AmaLevel"
  ELSE NULL
END;

-- Paso 3: Eliminar columna vieja (Int)
ALTER TABLE "Consultation" DROP COLUMN "amaLevel";

-- Paso 4: Renombrar columna nueva al nombre correcto
ALTER TABLE "Consultation" RENAME COLUMN "amaLevelNew" TO "amaLevel";
