"use client";

import { useActionState, useEffect, startTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Activity, Heart } from "lucide-react";
import { ProfileFormSection } from "./shared/ProfileFormSection";
import type { DecryptedPatientProfile } from "@/services/patient.service";
import { savePatientProfileAction } from "@/app/portal/(admin)/pacientes/[id]/_actions/profile";
import type { ActionState } from "@/lib/action-wrapper";
import { PatientProfileSchema, type SavePatientProfileInput } from "@/app/portal/(admin)/pacientes/[id]/_schemas/profile";
import { GENDER_LABELS, BLOOD_TYPE_LABELS } from "@/constants/enum-labels";
import { Gender, BloodType } from "@prisma/client";

interface PatientProfileFormProps {
  patient: DecryptedPatientProfile;
}

export function PatientProfileForm({ patient }: PatientProfileFormProps) {
  const [state, formAction, isPending] = useActionState<ActionState, SavePatientProfileInput>(
    savePatientProfileAction,
    null
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.error ?? state.message);
    }
  }, [state]);

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<SavePatientProfileInput>({
    resolver: zodResolver(PatientProfileSchema),
    defaultValues: {
      patientId: patient.id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone || '',
      dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.toISOString().split('T')[0] : '',
      gender: patient.gender ?? null,
      bloodType: patient.bloodType ?? null,
      occupation: patient.occupation || '',
      address: patient.address || '',
      dni: patient.dni || '',
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

  const onSubmit = handleSubmit((data: SavePatientProfileInput) => {
    startTransition(() => {
      formAction(data);
    });
  });

  return (
    <div className="bg-white rounded-3xl border border-border/40 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border/40 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Datos del Perfil</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Información administrativa pre-carga y cuestionario estático del paciente.
        </p>

      </div>

      {/* Form Content */}
      <form onSubmit={onSubmit}>
      <div className="p-8 space-y-10">
        <ProfileFormSection title="Datos Personales" icon={<User className="w-4 h-4" />}>
           <div className="grid grid-cols-2 gap-6">

             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Nombre Completo *</label>
               <input
                 {...register('name')}
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
               />
               {errors.name && <span className="text-xs text-red-500" role="alert">{errors.name.message}</span>}
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
               {errors.email && <span className="text-xs text-red-500" role="alert">{errors.email.message}</span>}
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
                 {(Object.values(Gender) as Gender[]).map((key) => (
                   <option key={key} value={key}>{GENDER_LABELS[key]}</option>
                 ))}
               </select>
             </div>

             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Grupo Sanguíneo</label>
               <select
                 {...register('bloodType')}
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full appearance-none shadow-sm cursor-pointer"
               >
                 <option value="">Desconocido</option>
                 {(Object.values(BloodType) as BloodType[]).map((key) => (
                   <option key={key} value={key}>{BLOOD_TYPE_LABELS[key]}</option>
                 ))}
               </select>
             </div>

             <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">DNI / Documento</label>
               <input
                 {...register('dni')}
                 placeholder="Ej: 12345678"
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
               />
             </div>

             <div className="col-span-2 space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold text-slate-500">Dirección</label>
               <input
                 {...register('address')}
                 placeholder="Ej: Av. Corrientes 1234, CABA"
                 className="h-11 bg-white border border-border/60 rounded-xl px-4 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
               />
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

      {/* Action Footer — sticky dentro del scroll container */}
      <div className="sticky bottom-0 z-10 p-8 border-t border-border/40 bg-slate-50/95 backdrop-blur-sm flex items-center justify-between">
         <span className="text-xs text-slate-500 font-medium">
           Actualizado: {patient.lastProfileUpdate ? new Date(patient.lastProfileUpdate).toLocaleDateString('es-AR') : 'Nunca'}
         </span>
         <div className="flex items-center gap-4">
           <button
             type="submit"
             disabled={isPending || !isDirty}
             className="bg-primary hover:bg-[#7a8c72] disabled:bg-primary/50 text-white px-8 h-12 rounded-full font-bold shadow-sm transition-all flex items-center gap-2"
           >
             {isPending ? "Guardando..." : "Guardar Perfil"}
           </button>
         </div>
      </div>
      </form>
    </div>
  );
}
