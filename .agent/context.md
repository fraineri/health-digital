# 🏥 Contexto de Proyecto: Plataforma de Medicina Integrativa & Ayurveda

## 1. Visión Global del Proyecto
El objetivo de este proyecto es construir un ecosistema digital para una médica clínica (recibida en la UBA, Argentina) especializada en Medicina Ayurveda. La plataforma debe funcionar como un "consultorio digital" que automatice la adquisición de pacientes, la gestión de turnos y, lo más importante, la entrega de valor a través de planes de salud personalizados.

El tono de la plataforma debe transmitir rigor científico (medicina occidental) combinado con la serenidad y personalización milenaria del Ayurveda. 

---

## 2. Arquitectura Conceptual del Producto
El sistema se divide en cuatro pilares lógicos que funcionan sobre un mismo repositorio (Monorepo) pero se separan por dominios o rutas virtuales estables usando *Middleware/Proxy*.

### A. Adquisición (La Vidriera Pública - `/home`)
Una Landing Page pública de alta conversión que valide las credenciales de la médica y explique de forma sencilla el enfoque integrativo. El único objetivo de esta página es que el paciente haga clic en "Reservar Consulta". Está alojada visualmente bajo el dominio raíz.

### B. Embudos de Agendamiento (Cal.com & Triage)
Integración mediante webhooks con Cal.com para que el paciente seleccione su zona horaria, elija un turno (presencial o virtual) y complete un cuestionario de "Triage" antes de confirmar, sincronizando la metadata hacia nuestra base de datos relacional.

### C. Gestión Clínica Privada (El Mini-CRM - `/portal`)
Un entorno de alta seguridad y productividad alojado bajo un subdominio o proxy (ej. `portal.dominio.com`). 
*   **Seguridad:** Accesible únicamente mediante credenciales estrictas protegidas por NextAuth v5 (JWT Edge).
*   **UX (Layout Tríptico):** Implementa un diseño premium de 3 columnas estilo "Inbox" (1. Barra global oscura de navegación, 2. Cola de trabajo Inbox clara con pacientes del día, 3. Lienzo de trabajo clínico Tono Piedra para foco total).
*   **Estética "Clinical Earthy":** Huye del clásico "azul de hospital". Utiliza tonos Verde Salvia (Primary), Piedra y Azul Noche (Slate Dark) para transmitir calma, naturaleza y profesionalismo. Incluye formas suaves de cápsulas (soft glassmorphism).

### D. Motor de Personalización (Doshas y Cuadernillos)
Es el módulo clínico central del Workspace tríptico. La profesional, tras finalizar la consulta, utiliza controles especializados (como las tarjetas evaluadoras de los Doshas Vata, Pitta, Kapha) y un área de notas inteligentes con etiquetas. Estos puntos de datos (Enfoque Nutricional, Rutinas, Hierbas) estructuran la entrada para generar automáticamente (y potencialmente asistido por IA) un **Cuadernillo de Salud en PDF**, hermoso y 100% personalizado.

---

## 3. Stack Tecnológico & Arquitectura Técnica

### Frontend & UI
- **Framework:** Next.js 16 (App Router + Turbopack).
- **Estilos:** Tailwind CSS v4 (utilizando la directiva `@theme` unificada) + Shadcn UI.
- **Micro-componentes:** Tarjetas de Diagnóstico Ayurvédico dinámicas, Textareas "físicos" auto-redimensionables para notas médicas, Indicadores de Inteligencia Artificial flotantes.

### Backend, Routing y Autenticación
- **Multi-Zona (Routing):** El tráfico web entra por un `proxy.ts` (Next Middleware) Edge, el cual reescribe estáticamente las URL hacia carpetas físicas seguras (`/home` y `/portal`) previniendo colisión de rutas.
- **Autenticación (Auth.js):** Manejado completamente con `next-auth@beta` v5 usando la estrategia JWT (JSON Web Tokens) para autorizar accesos a nivel Middleware / Edge. Se capturan los estados de error amigablemente usando ActionStates en React 19 vía "Server Actions".

### Base de Datos & Criptografía (Cumplimiento de Privacidad)
- **ORM:** Prisma Client apuntando a PostgreSQL (NeonDB).
- **Cripto de Capa de Aplicación:** Para proteger el secreto profesional médico y cumplir con regulaciones orgánicas, cualquier dato clínico crítico en las `Consultations` (como las anamnesis o notas que inserta la médica) es **encriptado obligatoriamente a nivel de servidor Node.js (AES-256-GCM)** antes de ser almacenado (mediante `/src/lib/encryption.ts`), y se descifra bajo demanda sólo para renderizado en el portal protegido del doctor habilitado.

---

## 4. Principios de Interacción para el Agente (LLM)
Al interactuar en la base de código de este proyecto, asume el rol de Arquitecto de Software y Product Designer Médico.
1. **Respeta la separación Zonal:** Nunca cruces responsabilidades entre `/home` (marketing público general) y `/portal` (herramienta privada restrictiva estricta).
2. **Prioriza la Privacidad:** Cualquier campo nuevo a la base de datos de pacientes/consultas debe pasar el escrutinio de si debe ser procesado plano, hasheado o pasado por criptografía asimétrica reversible.
3. **Mantenibilidad Funcional:** Mantén los Server Actions encapsulados y atados directamente a UI Client Components con estados React 19 optimistas. Todo micro-texto de la capa Ayurvédica debe ser fácil de re-mapear sin ingeniería profunda de base.

---

## 5. Historial de Progreso

### Sesión 2026-03-06 — Módulo de Autenticación (Portal Interno)

Se reemplazó la autenticación hardcodeada por un sistema real integrado a la base de datos.

**Arquitectura implementada (NextAuth v5 split-config):**
- `src/auth.config.ts` → Configuración Edge-safe (callbacks `authorized`, `jwt`, `session`). Sin dependencias de Node puro.
- `src/auth.ts` → Instancia principal con `CredentialsProvider` que valida credenciales contra Prisma (`User.password`) usando `bcryptjs`.
- `proxy.ts` → Ya existente; llama a `auth()` del archivo actualizado para proteger rutas del portal.
- `src/app/portal/login/actions.ts` → Server Action con `signIn()` y captura de `AuthError` para mostrar errores amigables vía `useActionState`.

**Cambios en la BD:**
- Modelo `User` en `schema.prisma`: campo `password` (String) añadido.
- Script de seed: `scripts/seed_admin.ts` (usa `upsert` con bcrypt).

**UI:**
- Login page (`/portal/login`) rediseñada con estética "Clinical Earthy" (gradiente piedra, glassmorphism, botón Verde Salvia, ícono Leaf, spinner de carga, errores inline estilizados).
- Admin layout convertido a Server Component async: muestra nombre del usuario desde la sesión y botón "Cerrar Sesión" con `signOut()` server action.

**Commits:**
- `6ad407e` — `feat(auth): redesign login UI with Clinical Earthy aesthetic + sign out`

### Sesión 2026-03-07 — Webhook Ingestion Engine & Subdomain Route Fixing (Portal Interno)

Se implementó el motor de ingesta de citas desde Cal.com (The Bridge) y se rediseñó la UI "Inbox" en tiempo real, resolviendo colisiones complejas de enrutamiento en App Router.

**Arquitectura implementada (Webhooks & DB):**
- `src/lib/webhook-handlers.ts` → Motor de purificación y Upsert. Valida `uid` por idempotencia e ingiere eventos `BOOKING_CREATED`, `CANCELLED` y `RESCHEDULED`. Destila las respuestas crudas del cuestionario de Cal.com adaptándolas a campos de BD estructurados (ej. `reasonForVisit`, mapeo de `appointmentType` vía `eventTypeId`).
- Integración end-to-end con `AppointmentInbox.tsx` (Columna 2) extrae los turnos del día para el Inbox Sidebar en la UI Tríptica y mapea con `PatientQueueItem.tsx`.

**Lecciones Arquitectónicas (Prevención de Errores 404 Estáticos):**
- **Subdomain Proxy Double-Routing Bug:** Al tener un interceptor custom en `src/proxy.ts` que inyecta `/portal` de fondo a las URLs que empiezan con `portal.localhost`, los links internos del sistema **NO DEBEN** poseer `/portal` rígido en el `href` (e.g. `router.push("/pacientes/[id]")` en lugar de `"/portal/pacientes/[id]"`). Si no, el middleware los intercepta generandó un doble prefijo (`/portal/portal/pacientes`) que arroja un fast-404 indetectable a nivel componente.
- **Next.js 15 Async Params:** Las rutas de catch-all o dinámicas puras como `src/app/portal/(admin)/pacientes/[id]/page.tsx` requieren obligatoriamente desestructuración asíncrona (`const { id } = await params;`) con tipado de promesa genérica `Promise<{ id: string }>`. Intentar acceder síncronamente al `id` provocará un crash SSR de React ("Sync Dynamic APIs Error").
- **Turbopack Build Cache Fallback (404):** Si Next.js no puede pre-resolver los IDs dinámicamente y no detecta que el Layout es dinámico, devolverá instintivamente 404 en compilación al no encontrar el ID en el mapa de Build. Las Server Components dinámicas de extracción (`pacientes/[id]/page.tsx`) deben resolverse adjuntando obligatoriamente `export const dynamic = 'force-dynamic';` para omitir la caché estática corrupta de Turbopack.

### Sesión 2026-03-07 — Módulo de Flujo de Consulta Médica (Workspace Clínico)

Se diseñó e implementó la vista principal para realizar consultas ayurvédicas, logrando un UX en tiempo real (Single Page feel) fuertemente tipado.

**1. Arquitectura del Workspace Interactivo (React State & UX):**
- El componente `ConsultationWorkspace.tsx` actúa como gran orquestador (Smart Component) que mantiene el estado global (`symptomIntensities`, `vataFinal`, notas) delegando callbacks de UI a micro-componentes puros (`DoshaSlider`, `SymptomChecklist`).
- Se aplicó un patrón UI de **Scroll Independiente (Split-Pane)**: La grilla padre restringe su altura (`h-full overflow-hidden`) delegando el `overflow-y-auto` a nivel columna individual. Esto permite navegar catálogos larguísimos de síntomas en la izquierda sin perder de vista los Doshas y las notas en la derecha.

**2. Scoring Engine & Flexibilidad de Dominio:**
- La lógica del motor de Ayurveda (`calculateDoshaScores`) ahora ingiere un mapa de intensidades (`Record<string, number>`) derivado de un Segmented Control (0-3). Mapear la intensidad por el `baseWeight` de cada Dosha arroja sugerencias que mutan en tiempo real según el checkbox.
- **Catálogo In-Memory:** El catálogo de síntomas se guardó como TypeScript puro (`SYMPTOM_CATALOG`) en `/src/lib/` en vez de usar base de datos. En etapa de evolución MVP, esto provee la libertad máxima de cambiar ramas médicas sin migraciones de modelo (`schema.prisma`). Sólo se guarda la instantánea dinámica (`symptomSnapshot` vía `JSON`) en PostgreSQL.

**3. Persistencia Atómica y Criptografía Server-Side:**
- El guardado ocurre con un "SaveButton" flotante asincrónico optimista (`useTransition`). 
- El `Server Action` de `saveConsultation` aprovecha el wrapper de `encrypt` (AES-256-GCM). Solo los datos analíticos "duros" (cantidades e índices) se guardan limpios; campos sensibles como `anamnesis`, `diagnosis`, `notes` (donde se generan los **Smart Tags automáticos**) se encriptan al ingresar a NeonDB.
- Se previene la pérdida accidental invocando el hook `beforeunload` cuando `isDirty` es `true` y el form no se guardó con éxito.

### Sesión 2026-03-07 — Módulo de Perfil de Paciente (Estático)

Se diseñó e implementó el módulo para recolectar datos demográficos, antecedentes y estilo de vida.

**1. Data Layer & Encriptación Extendida:**
- Modelo `Patient` extendido con 9 campos nuevos (incluyendo un JSON tipado para `lifestyle`).
- Se reutilizó el envoltorio criptográfico `AES-256-GCM` de `encryption.ts` para encriptar server-side los campos de `encryptedMedicalHistory` y `encryptedAllergies`.

**2. Merge Logic Diferenciada (Cal.com vs Local):**
- Los webhooks (`handleBookingCreated` de Cal.com) ahora **solo pre-pueblan** datos si el paciente es nuevo.
- Una vez guardados desde el Portal, se marca el `profileSource` como `'PORTAL'` limitando que futuros turnos importados sobreescriban los datos del paciente.

**3. UX Clínica (Indicador de Completitud y Sheet Lateral):**
- Un motor puro calcula el "Health Score" evaluando la completitud de campos obligatorios ponderados (Teléfono, Sexo, Fecha de Nac., Antecedentes y Alergias).
- El puntaje se expone como un `ProfileCompletionBadge` pulsante en la cabecera del Workspace.
- Al hacer clic, se despliega un `PatientProfileSheet` lateral (Shadcn) que no bloquea la vista del listado, persistiendo los datos vía Server Actions y Zod.
- La estética "Clinical Earthy" presenta campos médicos agrupados en contenedores con dividers suaves y menús desplegables tipados individualmente para evaluar gradientes de hábitos (Ansiedad, Tabaco, Alcohol) de forma más modular.

### Sesión 2026-03-23 — Refactor a Sistema de Tabs (Orquestador Clínico)

El workspace monolítico se refactorizó hacia una arquitectura modular basada en Tabs para agilizar la carga clínica y preparar la escalabilidad.

**1. Orquestador Centralizado (`PatientWorkspaceTabs.tsx`):**
- Actúa como el *Single Source of Truth* del estado clínico durante la consulta. Mantiene localmente las intensidades de síntomas, los scores de Doshas superpuestos, notas, y esquemas de tratamiento.
- Reemplazó al antiguo `ConsultationWorkspace.tsx`.
- Integra el `header` del paciente (antes en `page.tsx`) en su interior para manipular directamente la navegación al tocar el `ProfileCompletionBadge`.

**2. Desacoplamiento de Componentes Funcionales:**
- El contenido clínico se distribuyó en 5 pestañas: *Historia Clínica*, *Evaluación y Diagnóstico*, *Prescripción Integral*, *Cuadernillo* y *Notas de Consulta*.
- `PatientProfileSheet` (drawer lateral) fue eliminado en favor de `PatientProfileForm`, que fue extraído para vivir como un formulario inline dentro de la tab "Historia Clínica".
- `ConsultationHistory` es un nuevo componente read-only que obtiene todo el historial clínico anterior del paciente (descifrando la data en el servidor on-the-fly) para comparativas rápidas, visible nativamente debajo de las notas de sesión.

**3. UX Clínica Avanzada:**
- El **SaveButton** se mantiene flotante e instanciado una sola vez por fuera del contenedor de pestañas, recolectando la data atómicamente de todos el payload montado, asegurando persistencia ACID.
- Se replicó el "Split-Pane CSS" (`overflow-y-auto` con `h-full` anidado) dentro de la tab de *Evaluación y Diagnóstico* logrando scroll independiente entre la columna de síntomas y la columna de controles de Dosha.
