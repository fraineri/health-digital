-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "address" TEXT,
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "emergencyContactName" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "encryptedAllergies" TEXT,
ADD COLUMN     "encryptedMedicalHistory" TEXT,
ADD COLUMN     "lastProfileUpdate" TIMESTAMP(3),
ADD COLUMN     "lifestyle" JSONB,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "profileSource" TEXT;
