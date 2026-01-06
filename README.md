# Panel Central - Sistema de Gestión de Cronogramas de Supervisores

Sistema web para la gestión automatizada de cronogramas de supervisores de perforación minera, con reglas de negocio específicas y notificaciones en tiempo real.

## 🎯 Características Principales

### 📊 Dashboard Dinámico
- **Métricas en Tiempo Real**: Supervisores activos, turnos programados, tareas completadas
- **Actividad Reciente**: Feed de las últimas 20 acciones del sistema
- **Gráfico Semanal**: Distribución de turnos por día con visualización animada
- **Actualización Automática**: Los datos se actualizan instantáneamente sin recargar

### 👥 Gestión de Supervisores
- **CRUD Completo**: Crear, leer, actualizar y eliminar supervisores
- **Campos Específicos de Minería**:
  - Identificación (DNI/ID)
  - Régimen de trabajo (14×7, 7×7, 20×10, 5×2)
  - Estado en el ciclo (Subida, Inducción, Perforación, Bajada, Descanso)
- **Validación de Regla Crítica**: Sistema de alertas que garantiza siempre 2 supervisores perforando
- **Búsqueda Global**: Búsqueda rápida desde el encabezado

### 📅 Cronograma de Turnos
- **CRUD Completo**: Gestión de turnos por día y supervisor
- **Calendario Visual**: Vista semanal con cards animadas
- **Resumen Automático**: Estadísticas de cobertura y conflictos
- **Edición Rápida**: Dropdown en cada turno para editar o eliminar

### ✨ Generador Automático de Cronogramas
- **Motor de Generación**: Algoritmo que asigna automáticamente estados de ciclo
- **Respeta Reglas de Negocio**:
  - Exactamente 2 supervisores en perforación
  - Secuencias válidas (S → I → P → B → D)
  - Perforación mínima configurable
- **Grilla Visual Colorida**:
  - 🟦 Subida (S)
  - 🟨 Inducción (I)
  - 🟩 Perforación (P)
  - 🟧 Bajada (B)
  - ⬜ Descanso (D)
- **Validaciones en Tiempo Real**: Detección de errores críticos y warnings
- **Fila de Resumen**: Indica con colores si cada día cumple la regla de 2 perforando

### 🔔 Sistema de Notificaciones
- **Notificaciones Toast**: Alertas visuales para cada acción (crear, editar, eliminar)
- **Panel de Actividad**: Dropdown en el botón de campana con últimas 10 actividades
- **Configuración Persistente**: El usuario puede activar/desactivar notificaciones
- **Tiempo Relativo**: "Hace 5 min", "Hace 2 horas", etc.

### ⚙️ Configuración
- Control de notificaciones en pantalla
- Opciones de notificaciones por correo (placeholder)
- Recordatorios de turno
- Preferencias guardadas en LocalStorage

### 🔍 Búsqueda Global
- Búsqueda en tiempo real desde el encabezado
- Busca en supervisores y turnos
- Resultados con navegación directa

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación

### UI/UX
- **shadcn/ui** - Componentes base
- **Tailwind CSS** - Estilos utility-first
- **Lucide Icons** - Iconografía moderna
- **Radix UI** - Primitivos accesibles

### Estado y Persistencia
- **LocalStorage** - Persistencia de datos
- **Custom Hooks** - Gestión de estado reactivo
- **Event System** - Sincronización entre componentes

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── BarraLateral.tsx          # Navegación lateral
│   │   ├── Encabezado.tsx            # Header con búsqueda y notificaciones
│   │   ├── LayoutPrincipal.tsx       # Layout wrapper
│   │   ├── NuevoSupervisorDialog.tsx # Modal para supervisores
│   │   └── NuevoTurnoDialog.tsx      # Modal para turnos
│   └── ui/                            # Componentes shadcn/ui
├── hooks/
│   ├── useData.ts                     # Hooks de datos (supervisores, turnos)
│   └── useNotifications.ts            # Hook de notificaciones
├── pages/
│   ├── ResumenGeneral.tsx             # Dashboard principal
│   ├── Supervisores.tsx               # Gestión de supervisores
│   ├── Cronograma.tsx                 # Vista de cronograma
│   ├── GeneradorCronograma.tsx        # Generador automático
│   ├── Configuracion.tsx              # Configuración del sistema
│   └── Ayuda.tsx                      # Centro de ayuda
├── services/
│   ├── storage.service.ts             # Servicio de LocalStorage
│   └── schedule-generator.service.ts  # Motor de generación de cronogramas
└── App.tsx                            # Componente raíz
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16+ y npm

### Instalación

```bash
# Clonar el repositorio
git clone <YOUR_GIT_URL>

# Navegar al directorio
cd panel-central

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## 📖 Guía de Uso

### 1. Crear Supervisores
1. Ve a **Supervisores** en el sidebar
2. Clic en "Agregar Supervisor"
3. Completa los campos:
   - Nombre
   - Identificación
   - Correo y Teléfono
   - **Régimen** (ej: 14x7)
   - **Estado en el Ciclo**
4. Guardar

### 2. Programar Turnos
1. Ve a **Cronograma**
2. Clic en "+ Nuevo Turno"
3. Selecciona supervisor, día, actividad
4. Guardar
5. **Editar/Eliminar**: Clic en el menú ⋯ de cada turno

### 3. Generar Cronograma Automático
1. Asegúrate de tener supervisores con régimen definido
2. Ve a **Generador Auto** en el sidebar
3. Configura:
   - Días de Inducción
   - Días Mínimos de Perforación
   - Total de Días a proyectar
4. Clic en "Calcular Cronograma"
5. Revisa la grilla generada y los errores/warnings

### 4. Ver Notificaciones
- Clic en el icono de campana 🔔 en el header
- Ver las últimas actividades
- Configurar preferencias en **Configuración**

## 🔧 Configuración del Sistema

### Notificaciones
Ve a **Configuración** → **Notificaciones**:
- **Notificaciones en pantalla**: Activa/desactiva toasts
- **Notificaciones por correo**: Placeholder para futuro
- **Recordatorios de turno**: Placeholder para futuro

Las preferencias se guardan automáticamente en LocalStorage.

## 📊 Reglas de Negocio Implementadas

### Regla Crítica: "Siempre 2 Perforando"
- En cualquier día debe haber **exactamente 2** supervisores en estado "Perforación"
- El sistema valida y alerta si:
  - Hay menos de 2 (sub-dotación)
  - Hay más de 2 (sobrecarga)

### Secuencias Válidas del Ciclo
- ✅ `Subida → Inducción → Perforación → Bajada → Descanso`
- ❌ `Subida → Subida` (no permitido)
- ❌ `Subida → Bajada` (sin sentido)
- ❌ Perforación de 1 solo día (mínimo configurable)

## 🎨 Temas
El sistema soporta:
- 🌞 Modo claro
- 🌙 Modo oscuro
- 🔄 Automático (según preferencias del sistema)

Cambiar tema: Icono en el footer del sidebar

## 📱 Responsivo
La interfaz está optimizada para:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🗂️ Persistencia de Datos
Todos los datos se almacenan en **LocalStorage** del navegador:
- `panel-central-supervisores-v2`
- `panel-central-turnos-v2`
- `panel-central-activity-log-v2`
- `panel-central-notification-settings`

**Nota**: Los datos persisten entre sesiones pero son locales al navegador.

## 🐛 Depuración

### Limpiar datos
Abre la consola del navegador y ejecuta:
```javascript
localStorage.clear();
location.reload();
```

### Ver datos almacenados
```javascript
console.log(JSON.parse(localStorage.getItem('panel-central-supervisores-v2')));
console.log(JSON.parse(localStorage.getItem('panel-central-turnos-v2')));
```

## 🤝 Contribuir
Este proyecto está en desarrollo activo. Las mejoras futuras incluyen:
- Backend con base de datos
- Autenticación de usuarios
- Exportar cronogramas a PDF/CSV
- Edición manual de cronogramas generados
- Sistema de permisos por rol
- Notificaciones por email reales

## 📄 Licencia
Este proyecto es privado y de uso interno.

## 🆘 Soporte
Para preguntas o problemas, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para la gestión eficiente de operaciones mineras**
