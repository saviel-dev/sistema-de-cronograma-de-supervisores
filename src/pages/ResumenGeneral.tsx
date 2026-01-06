/**
 * ResumenGeneral.tsx
 * 
 * Página principal del dashboard que muestra un resumen
 * de las métricas y actividades más importantes del sistema.
 * Incluye animaciones de entrada y conteo en las cifras.
 */

import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContadorAnimado from "@/components/ui/ContadorAnimado";
import { useSupervisores, useTurnos } from "@/hooks/useData";
import { StorageService } from "@/services/storage.service";

// Eliminado array estático de metricas
// const metricas = [...];

// Eliminado array estático de actividades
// const actividadReciente = [...];

const ResumenGeneral = () => {
  const { supervisores } = useSupervisores();
  const { turnos } = useTurnos();
  const [actividadReciente, setActividadReciente] = useState<any[]>([]);

  // Cargar actividad reciente
  useEffect(() => {
    const loadActivity = () => {
      const log = StorageService.getActivityLog();
      // Mapear a formato de UI con iconos
      const formattedLog = log.map((item: any) => {
        let icono = CheckCircle;
        if (item.accion.includes("eliminó")) icono = AlertTriangle;
        if (item.accion.includes("editó")) icono = Clock;
        if (item.accion.includes("creó")) icono = Calendar;

        // Calcular tiempo relativo
        const diff = Date.now() - item.timestamp;
        const minutos = Math.floor(diff / 60000);
        const horas = Math.floor(minutos / 60);
        let tiempo = "Hace unos segundos";
        if (minutos < 60) tiempo = `Hace ${minutos} min`;
        else if (horas < 24) tiempo = `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
        else tiempo = `Hace ${Math.floor(horas / 24)} día${Math.floor(horas / 24) > 1 ? 's' : ''}`;

        return {
          usuario: item.usuario,
          accion: item.accion,
          tiempo,
          icono
        };
      });
      setActividadReciente(formattedLog.slice(0, 5)); // Mostrar solo las últimas 5
    };

    loadActivity();
    window.addEventListener("storage-activity-update", loadActivity);
    return () => window.removeEventListener("storage-activity-update", loadActivity);
  }, []);


  // Calcular distribución de turnos por día
  const shiftsByDay = [0, 0, 0, 0, 0, 0, 0]; // Lun-Dom
  turnos.forEach(t => {
    if (t.dia >= 0 && t.dia <= 6) {
      shiftsByDay[t.dia]++;
    }
  });
  const maxShifts = Math.max(...shiftsByDay, 1); // Evitar división por 0

  const metricas = [
    {
      titulo: "Supervisores Activos",
      valor: supervisores.filter(s => s.estado === 'activo').length,
      cambio: "Total registrados: " + supervisores.length,
      icono: Users,
      colorIcono: "text-white",
      fondoIcono: "bg-white/20",
      bgColor: "bg-blue-600",
    },
    {
      titulo: "Turnos Programados",
      valor: turnos.length,
      cambio: "Para esta semana",
      icono: Calendar,
      colorIcono: "text-white",
      fondoIcono: "bg-white/20",
      bgColor: "bg-violet-600",
    },
    {
      titulo: "Tareas Completadas",
      valor: 89, // Mantener estático por ahora
      esPorcentaje: true,
      cambio: "+5% vs mes anterior",
      icono: CheckCircle,
      colorIcono: "text-white",
      fondoIcono: "bg-white/20",
      bgColor: "bg-emerald-600",
    },
    {
      titulo: "Pendientes Urgentes",
      valor: 3, // Mantener estático por ahora
      cambio: "Requieren atención",
      icono: AlertTriangle,
      colorIcono: "text-white",
      fondoIcono: "bg-white/20",
      bgColor: "bg-rose-600",
    },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Mensaje de bienvenida con animación de entrada */}
      <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
        <h2 className="text-2xl font-bold text-foreground">
          ¡Bienvenido al Sistema!
        </h2>
        <p className="text-muted-foreground mt-1">
          Aquí tienes un resumen de la actividad del sistema de cronogramas.
        </p>
      </div>

      {/* Grid de tarjetas de métricas con animaciones escalonadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricas.map((metrica, index) => (
          <Card
            key={metrica.titulo}
            className={`border-border shadow-sm hover:shadow-md transition-shadow animate-fade-in ${metrica.bgColor}`}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-white/80">
                    {metrica.titulo}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    <ContadorAnimado
                      valor={metrica.valor}
                      esPorcentaje={metrica.esPorcentaje || false}
                      duracion={1500 + index * 200}
                    />
                  </p>
                  <p className="text-xs text-white/70">
                    {metrica.cambio}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${metrica.fondoIcono}`}>
                  <metrica.icono className={`h-5 w-5 ${metrica.colorIcono}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de contenido adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de rendimiento */}
        <Card
          className="lg:col-span-2 border-border shadow-sm animate-fade-in"
          style={{ animationDelay: "500ms" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Rendimiento Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Área de gráfico con barras animadas */}
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((dia, index) => {
                const altura = maxShifts > 0 ? (shiftsByDay[index] / maxShifts) * 90 : 0;
                return (
                  <div key={dia} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full bg-primary/80 rounded-t-md hover:bg-primary transition-all duration-500 relative group"
                      style={{
                        height: `${altura}%`,
                        minHeight: shiftsByDay[index] > 0 ? "20px" : "0",
                        animation: `grow-bar 0.8s ease-out ${index * 100}ms forwards`,
                        transform: "scaleY(0)",
                        transformOrigin: "bottom"
                      }}
                    >
                      {shiftsByDay[index] > 0 && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          {shiftsByDay[index]}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{dia}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Lista de actividad reciente */}
        <Card
          className="border-border shadow-sm animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actividadReciente.map((actividad, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${700 + index * 100}ms` }}
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <actividad.icono className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {actividad.usuario}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {actividad.accion}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {actividad.tiempo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estilos CSS para la animación de las barras del gráfico */}
      <style>{`
        @keyframes grow-bar {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ResumenGeneral;
