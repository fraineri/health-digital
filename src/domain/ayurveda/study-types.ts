// --- Tipo para datos desencriptados desde la BD ---
export interface DecryptedStudyEntry {
  id: string;
  studyName: string;
  value: string;          // Valor desencriptado
  consultationId: string;
  createdAt: Date;
}

// --- Tipo para el estado editable en el cliente ---
export interface StudyEntry {
  id: string;             // UUID temporal para key de React (crypto.randomUUID)
  studyName: string;      // Nombre del estudio (del catalogo o nuevo)
  value: string;          // Valor en texto plano (se encripta al guardar)
  previousValue?: string; // Valor anterior (de consulta previa, read-only)
  previousDate?: Date;    // Fecha del valor anterior
  isNew: boolean;         // true si el estudio no existia previamente para este paciente
}

// --- Tipo para el payload de guardado ---
export interface StudyPayloadEntry {
  studyName: string;      // Nombre del estudio
  value: string;          // Valor en texto plano (se encriptara server-side)
}
