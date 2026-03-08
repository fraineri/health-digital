"use client";

import { useState, useTransition } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { User, Activity, AlertCircle, Heart } from "lucide-react";
import { ProfileFormSection } from "./ProfileFormSection";
import { DecryptedPatientProfile } from "@/lib/patient-profile";
import { savePatientProfile } from "@/app/portal/(admin)/pacientes/[id]/profile-actions";

interface PatientProfileSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  patient: DecryptedPatientProfile;
}

export function PatientProfileSheet({
  isOpen,
  onOpenChange,
  patient,
}: PatientProfileSheetProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Estados del formulario (pre-rellenados con props)
  const [formData, setFormData] = useState({
    name: patient.name,
    email: patient.email,
    phone: patient.phone || "",
    dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.toISOString().split('T')[0] : "",
    gender: patient.gender || "",
    bloodType: patient.bloodType || "",
    occupation: patient.occupation || "",
    medicalHistory: patient.medicalHistory || "",
    allergies: patient.allergies || "",
    lifestyle: {
      dietType: patient.lifestyle?.dietType || "",
      exerciseFrequency: patient.lifestyle?.exerciseFrequency || "",
      sleepQuality: patient.lifestyle?.sleepQuality || "",
      stressLevel: patient.lifestyle?.stressLevel || "",
      smokingStatus: patient.lifestyle?.smokingStatus || "",
      alcoholConsumption: patient.lifestyle?.alcoholConsumption || "",
      anxietyLevel: patient.lifestyle?.anxietyLevel || "",
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('lifestyle.')) {
      const lifestyleField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        lifestyle: { ...prev.lifestyle, [lifestyleField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setErrorMsg(null);
    startTransition(async () => {
      const result = await savePatientProfile({
        patientId: patient.id,
        ...formData
      });

      if (result.success) {
        onOpenChange(false);
      } else {
        setErrorMsg(result.error || "Error al guardar el perfil");
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl bg-workspace border-l border-border/40 overflow-y-auto !custom-scrollbar p-0">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-workspace/90 backdrop-blur-md px-8 py-6 border-b border-white/10 shrink-0">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-slate-800">Perfil del Paciente</SheetTitle>
            <SheetDescription className="text-sm font-medium text-slate-500">
              Datos administrativos y cuestionario médico estático.
            </SheetDescription>
          </SheetHeader>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-medium">
               {errorMsg}
            </div>
          )}
        </div>

        {/* Scrollable Form Content */}
        <div className="px-8 pb-12">
          
          <ProfileFormSection title="Datos Personales" icon={<User className="w-4 h-4" />}>
             <div className="grid grid-cols-2 gap-4">
               
               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Nombre Completo *</label>
                 <input 
                   name="name" value={formData.name} onChange={handleChange} 
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full" 
                 />
                 {patient.profileSource === 'CAL_COM' && (
                   <span className="text-[10px] text-slate-400">Desde Cal.com</span>
                 )}
               </div>

               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Email *</label>
                 <input 
                   name="email" value={formData.email} onChange={handleChange} type="email"
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full" 
                 />
               </div>

               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Teléfono</label>
                 <input 
                   name="phone" value={formData.phone} onChange={handleChange} 
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full" 
                 />
               </div>

               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Fecha de Nacimiento</label>
                 <input 
                   name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date"
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full" 
                 />
               </div>

               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Género</label>
                 <select 
                   name="gender" value={formData.gender} onChange={handleChange}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                 >
                   <option value="">Seleccionar...</option>
                   <option value="Femenino">Femenino</option>
                   <option value="Masculino">Masculino</option>
                   <option value="Otro">Otro</option>
                   <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                 </select>
               </div>

               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Grupo Sanguíneo</label>
                 <select 
                   name="bloodType" value={formData.bloodType} onChange={handleChange}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                 >
                   <option value="">Desconocido</option>
                   <option value="A+">A+</option>
                   <option value="A-">A-</option>
                   <option value="B+">B+</option>
                   <option value="B-">B-</option>
                   <option value="AB+">AB+</option>
                   <option value="AB-">AB-</option>
                   <option value="O+">O+</option>
                   <option value="O-">O-</option>
                 </select>
               </div>

             </div>
          </ProfileFormSection>

          <ProfileFormSection title="Historial Médico (Encriptado)" icon={<Activity className="w-4 h-4" />}>
            <div className="space-y-4">
               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Antecedentes, Cirugías, Enfermedades Crónicas</label>
                 <textarea 
                   name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} rows={4}
                   className="w-full bg-white border border-border/60 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-y" 
                   placeholder="Ej: Apendicectomía (2015), Hipotiroidismo controlado..."
                 />
               </div>
               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Alergias e Intolerancias</label>
                 <textarea 
                   name="allergies" value={formData.allergies} onChange={handleChange} rows={2}
                   className="w-full bg-white border border-border/60 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-y text-red-600/90 placeholder:text-slate-400" 
                   placeholder="Ej: Penicilina, Intolerancia a la lactosa leve..."
                 />
               </div>
            </div>
          </ProfileFormSection>

          <ProfileFormSection title="Estilo de Vida y Hábitos" icon={<Heart className="w-4 h-4" />}>
             <div className="grid grid-cols-2 gap-4">
                 
                 <div className="space-y-1.5 flex flex-col">
                   <label className="text-xs font-semibold text-slate-500">Alimentación</label>
                   <select 
                     name="lifestyle.dietType" value={formData.lifestyle.dietType} onChange={handleChange}
                     className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                   >
                     <option value="">Seleccionar...</option>
                     <option value="Omnívora">Omnívora</option>
                     <option value="Vegetariana">Vegetariana</option>
                     <option value="Vegana / Plant-based">Vegana / Plant-based</option>
                     <option value="Keto / Low-carb">Keto / Low-carb</option>
                     <option value="Pescatariana">Pescatariana</option>
                   </select>
                 </div>

                 <div className="space-y-1.5 flex flex-col">
                   <label className="text-xs font-semibold text-slate-500">Actividad Física</label>
                   <select 
                     name="lifestyle.exerciseFrequency" value={formData.lifestyle.exerciseFrequency} onChange={handleChange}
                     className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                   >
                     <option value="">Seleccionar...</option>
                     <option value="Sedentario">Sedentario</option>
                     <option value="Ocasional (1-2x/sem)">Ocasional (1-2x/sem)</option>
                     <option value="Regular (3-4x/sem)">Regular (3-4x/sem)</option>
                     <option value="Diario">Diario / Atleta</option>
                   </select>
                 </div>

                 <div className="space-y-1.5 flex flex-col">
                   <label className="text-xs font-semibold text-slate-500">Calidad de Sueño</label>
                   <select 
                     name="lifestyle.sleepQuality" value={formData.lifestyle.sleepQuality} onChange={handleChange}
                     className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                   >
                     <option value="">Seleccionar...</option>
                     <option value="Excelente (8h+ profundas)">Excelente (8h+ profundas)</option>
                     <option value="Buena (7-8h reparadoras)">Buena (7-8h reparadoras)</option>
                     <option value="Regular (Despertares)">Regular (Despertares)</option>
                     <option value="Mala (Insomnio/Fatiga)">Mala (Insomnio / Fatiga al despertar)</option>
                   </select>
                 </div>

                 <div className="space-y-1.5 flex flex-col">
                   <label className="text-xs font-semibold text-slate-500">Nivel de Estrés</label>
                   <select 
                     name="lifestyle.stressLevel" value={formData.lifestyle.stressLevel} onChange={handleChange}
                     className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                   >
                     <option value="">Seleccionar...</option>
                     <option value="Bajo">Bajo (Equilibrado)</option>
                     <option value="Moderado">Moderado (Manejable)</option>
                     <option value="Alto">Alto (Abrumado a veces)</option>
                     <option value="Crónico">Crónico / Burnout</option>
                   </select>
                 </div>

                 <div className="space-y-1.5 flex flex-col">
                   <label className="text-xs font-semibold text-slate-500">Nivel de Ansiedad</label>
                   <select 
                     name="lifestyle.anxietyLevel" value={formData.lifestyle.anxietyLevel} onChange={handleChange}
                     className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                   >
                     <option value="">Seleccionar...</option>
                     <option value="Bajo (Controlada)">Bajo (Controlada)</option>
                     <option value="Moderado (Ocasional)">Moderado (Ocasional / Situacional)</option>
                     <option value="Atracones/Somatización">Alta con Atracones / Somatización</option>
                     <option value="Ataques de Pánico">Severa (Ataques de pánico)</option>
                   </select>
                 </div>

                 <div className="space-y-1.5 flex flex-col">
                   <label className="text-xs font-semibold text-slate-500">Consumo de Tabaco</label>
                   <select 
                     name="lifestyle.smokingStatus" value={formData.lifestyle.smokingStatus} onChange={handleChange}
                     className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                   >
                     <option value="">Seleccionar...</option>
                     <option value="No fuma">No fuma</option>
                     <option value="Ex-fumador">Ex-fumador</option>
                     <option value="Ocasional (Social)">Ocasional (Social)</option>
                     <option value="Fumador Activo">Fumador activo</option>
                     <option value="Vapeo / Alternativos">Vapeo / Cigarrillo electrónico</option>
                   </select>
                 </div>

                 <div className="space-y-1.5 flex flex-col">
                   <label className="text-xs font-semibold text-slate-500">Consumo de Alcohol</label>
                   <select 
                     name="lifestyle.alcoholConsumption" value={formData.lifestyle.alcoholConsumption} onChange={handleChange}
                     className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none"
                   >
                     <option value="">Seleccionar...</option>
                     <option value="No consume">No consume</option>
                     <option value="Ocasional (Sociales)">Ocasional (Eventos sociales)</option>
                     <option value="Regular (Fines de semana)">Regular (Fines de semana)</option>
                     <option value="Frecuente (Diario/Casi diario)">Frecuente (Diario o casi diario)</option>
                   </select>
                 </div>

             </div>
          </ProfileFormSection>

        </div>

        {/* Relative Footer (Boton Guardar debajo de todo) */}
        <div className="p-8 border-t border-border/30 mt-4">
           <button 
             onClick={handleSave}
             disabled={isPending}
             className="w-full bg-[#8d9f85] hover:bg-[#7a8c72] disabled:bg-[#a9bca1] text-white h-14 rounded-full font-bold shadow-md transition-all flex items-center justify-center gap-2"
           >
             {isPending ? "Guardando perfil..." : "Guardar Perfil"}
           </button>
        </div>

      </SheetContent>
    </Sheet>
  );
}
