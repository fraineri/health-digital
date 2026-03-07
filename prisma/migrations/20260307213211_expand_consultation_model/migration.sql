/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('FIRST_CONSULTATION', 'FOLLOW_UP');

-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'RESCHEDULED';

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "appointmentType" "AppointmentType" NOT NULL DEFAULT 'FIRST_CONSULTATION',
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "eventTypeSlug" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "rescheduledFrom" TEXT;

-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "dailyRoutine" TEXT,
ADD COLUMN     "encryptedDiagnosis" TEXT,
ADD COLUMN     "kaphaFinal" DOUBLE PRECISION,
ADD COLUMN     "kaphaSuggested" DOUBLE PRECISION,
ADD COLUMN     "nutritionPlan" TEXT,
ADD COLUMN     "phytotherapy" TEXT,
ADD COLUMN     "pittaFinal" DOUBLE PRECISION,
ADD COLUMN     "pittaSuggested" DOUBLE PRECISION,
ADD COLUMN     "symptomSnapshot" JSONB,
ADD COLUMN     "vataFinal" DOUBLE PRECISION,
ADD COLUMN     "vataSuggested" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "vulnerableGroup" TEXT;

-- AlterTable
ALTER TABLE "TriageResponse" ADD COLUMN     "rawResponses" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
