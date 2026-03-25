-- CreateTable
CREATE TABLE "StudyCatalog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplementaryStudy" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "studyName" TEXT NOT NULL,
    "encryptedValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplementaryStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyCatalog_name_key" ON "StudyCatalog"("name");

-- CreateIndex
CREATE INDEX "ComplementaryStudy_patientId_studyName_createdAt_idx" ON "ComplementaryStudy"("patientId", "studyName", "createdAt");

-- AddForeignKey
ALTER TABLE "ComplementaryStudy" ADD CONSTRAINT "ComplementaryStudy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplementaryStudy" ADD CONSTRAINT "ComplementaryStudy_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
