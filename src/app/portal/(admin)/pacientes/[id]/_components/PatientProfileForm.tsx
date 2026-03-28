"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Activity, AlertCircle, Heart } from "lucide-react";
import { ProfileFormSection } from "./ProfileFormSection";
import { DecryptedPatientProfile } from "@/queries/patient-profile";
import { savePatientProfile, PatientProfileSchema, type SavePatientProfileInput } from "@/app/portal/(admin)/pacientes/[id]/_actions/profile";

interface PatientProfileFormProps {
  patient: DecryptedPatientProfile;
}

export function PatientProfileForm({ patient }: PatientProfileFormProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<SavePatientProfileInput>({
    resolver: zodResolver(PatientProfileSchema),
    defaultValues: {
      patientId: patient.id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone || '',
      dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.toISOString().split('T')[0] : '',
      gender: patient.gender || '',
      bloodType: patient.bloodType || '',
      occupation: patient.occupation || '',
      medicalHistory: patient.medicalHistory || '',
      allergies: patient.allergies || '',
      lifestyle: {
        dietType: patient.lifestyle?.dietType || '',
        exerciseFrequency: patient.lifestyle?.exerciseFrequency || '',
        sleepQuality: patient.lifestyle?.sleepQuality || '',
        stressLevel: patient.lifestyle?.stressLevel || '',
        smokingStatus: patient.lifestyle?.smokingStatus || '',
        alcoholConsumption: patient.lifestyle?.alcoholConsumption || '',
        anxietyLevel: patient.lifestyle?.anxietyLevel || '',
      }
    }
  });

  const onSubmit = async (data: SavePatientProfileInput) => {
    setErrorMsg(null);
    setIsSuccess(false);
    const result = await savePatientProfile(data);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } else {
      setErrorMsg(result.error || 'Error al guardar el perfil');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-border/40 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border/40 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Datos del Perfil</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Información administrativa pre-carga y cuestionario estático del paciente.
        </p>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-medium">
             {errorMsg}
          </div>
        )}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-8 space-y-10">
        <ProfileFormSection title="Datos Personales" icon={<User className="w-4 h-4" />}>
           <div className="grid grid-cols-2 gap-6">

             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Nombre Completo *</label>
               <input
                 {...register('name')}
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
               />
               {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
               {patient.profileSource === 'CAL_COM' && (
                 <span className="text-[10px] text-slate-400">Importado desde Cal.com</span>
               )}
             </div>

             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Email *</label>
               <input
                 {...register('email')} type="email"
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
               />
               {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
             </div>

             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Teléfono</label>
               <input
                 {...register('phone')}
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
               />
             </div>

             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Fecha de Nacimiento</label>
               <input
                 {...register('dateOfBirth')} type="date"
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
               />
             </div>

             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Género</label>
               <select
                 {...register('gender')}
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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
                 {...register('bloodType')}
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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
          <div className="space-y-6">
             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Antecedentes, Cirugías, Enfermedades Crónicas</label>
               <textarea
                 {...register('medicalHistory')} rows={4}
                 className="w-full bg-white border border-border/60 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-y shadow-sm"
                 placeholder="Ej: Apendicectomía (2015), Hipotiroidismo controlado..."
               />
             </div>
             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Alergias e Intolerancias</label>
               <textarea
                 {...register('allergies')} rows={2}
                 className="w-full bg-white border border-border/60 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-y text-red-600/90 placeholder:text-slate-400 shadow-sm"
                 placeholder="Ej: Penicilina, Intolerancia a la lactosa leve..."
               />
             </div>
          </div>
        </ProfileFormSection>

        <ProfileFormSection title="Estilo de Vida y Hábitos" icon={<Heart className="w-4 h-4" />}>
           <div className="grid grid-cols-2 gap-6">

               <div className="space-y-1.5 flex flex-col">
                 <label className="text-xs font-semibold text-slate-500">Alimentación</label>
                 <select
                   {...register('lifestyle.dietType')}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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
                   {...register('lifestyle.exerciseFrequency')}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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
                   {...register('lifestyle.sleepQuality')}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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
                   {...register('lifestyle.stressLevel')}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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
                   {...register('lifestyle.anxietyLevel')}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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
                   {...register('lifestyle.smokingStatus')}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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
                   {...register('lifestyle.alcoholConsumption')}
                   className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
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

      {/* Action Footer */}
      <div className="p-8 border-t border-border/40 bg-slate-50 flex items-center justify-between">
         <span className="text-xs text-slate-500 font-medium">
           Actualizado: {patient.lastProfileUpdate ? new Date(patient.lastProfileUpdate).toLocaleDateString('es-AR') : 'Nunca'}
         </span>
         <div className="flex items-center gap-4">
           {isSuccess && <span className="text-sm font-bold text-primary">¡Guardado con éxito!</span>}
           <button
             type="submit"
             disabled={isSubmitting || !isDirty}
             className="bg-primary hover:bg-[#7a8c72] disabled:bg-primary/50 text-white px-8 h-12 rounded-full font-bold shadow-sm transition-all flex items-center gap-2"
           >
             {isSubmitting ? "Guardando..." : "Guardar Perfil"}
           </button>
         </div>
      </div>
      </form>
    </div>
  );
}
