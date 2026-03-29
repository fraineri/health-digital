-- Mapeo de datos existentes: gender (String → Enum)
UPDATE "Patient" SET "gender" = 'FEMENINO' WHERE "gender" = 'Femenino';
UPDATE "Patient" SET "gender" = 'MASCULINO' WHERE "gender" = 'Masculino';
UPDATE "Patient" SET "gender" = 'OTRO' WHERE "gender" = 'Otro';
UPDATE "Patient" SET "gender" = 'NO_ESPECIFICADO' WHERE "gender" = 'Prefiero no decirlo';
-- Valores no reconocidos → NULL (para que el ALTER TYPE no falle)
UPDATE "Patient" SET "gender" = NULL WHERE "gender" IS NOT NULL AND "gender" NOT IN ('FEMENINO', 'MASCULINO', 'OTRO', 'NO_ESPECIFICADO');

-- Mapeo de datos existentes: bloodType (String → Enum)
UPDATE "Patient" SET "bloodType" = 'A_POS' WHERE "bloodType" = 'A+';
UPDATE "Patient" SET "bloodType" = 'A_NEG' WHERE "bloodType" = 'A-';
UPDATE "Patient" SET "bloodType" = 'B_POS' WHERE "bloodType" = 'B+';
UPDATE "Patient" SET "bloodType" = 'B_NEG' WHERE "bloodType" = 'B-';
UPDATE "Patient" SET "bloodType" = 'AB_POS' WHERE "bloodType" = 'AB+';
UPDATE "Patient" SET "bloodType" = 'AB_NEG' WHERE "bloodType" = 'AB-';
UPDATE "Patient" SET "bloodType" = 'O_POS' WHERE "bloodType" = 'O+';
UPDATE "Patient" SET "bloodType" = 'O_NEG' WHERE "bloodType" = 'O-';
UPDATE "Patient" SET "bloodType" = NULL WHERE "bloodType" IS NOT NULL AND "bloodType" NOT IN ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMENINO', 'MASCULINO', 'OTRO', 'NO_ESPECIFICADO');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "gender" TYPE "Gender" USING "gender"::"Gender";
ALTER TABLE "Patient" ALTER COLUMN "bloodType" TYPE "BloodType" USING "bloodType"::"BloodType";
