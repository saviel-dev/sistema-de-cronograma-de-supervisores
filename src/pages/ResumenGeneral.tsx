/**
 * ResumenGeneral.tsx
 * 
 * Página principal del dashboard que muestra un resumen
 * de las métricas y actividades más importantes del sistema.
 * Incluye animaciones de entrada y conteo en las cifras.
 */

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

// Datos de demostración para las tarjetas de métricas
const metricas = [
  {
    titulo: "Supervisores Activos",
    valor: 24,
    cambio: "+2 esta semana",
    icono: Users,
    colorIcono: "text-primary",
    fondoIcono: "bg-primary/10",
  },
  {
    titulo: "Turnos Programados",
    valor: 156,
    cambio: "Para esta semana",
    icono: Calendar,
    colorIcono: "text-chart-2",
    fondoIcono: "bg-chart-2/10",
  },
  {
    titulo: "Tareas Completadas",
    valor: 89,
    esPorcentaje: true,
    cambio: "+5% vs mes anterior",
    icono: CheckCircle,
    colorIcono: "text-chart-1",
    fondoIcono: "bg-chart-1/10",
  },
  {
    titulo: "Pendientes Urgentes",
    valor: 3,
    cambio: "Requieren atención",
    icono: AlertTriangle,
    colorIcono: "text-destructive",
    fondoIcono: "bg-destructive/10",
  },
];

// Actividad reciente para mostrar en la lista
const actividadReciente = [
  {
    usuario: "Carlos Mendoza",
    accion: "completó turno de supervisión",
    tiempo: "Hace 30 min",
    icono: CheckCircle,
  },
  {
    usuario: "Ana García",
    accion: "actualizó su disponibilidad",
    tiempo: "Hace 1 hora",
    icono: Clock,
  },
  {
    usuario: "Roberto Silva",
    accion: "solicitó cambio de turno",
    tiempo: "Hace 2 horas",
    icono: Calendar,
  },
  {
    usuario: "María López",
    accion: "reportó incidencia",
    tiempo: "Hace 3 horas",
    icono: AlertTriangle,
  },
];

const ResumenGeneral = () => {
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
            className="border-border shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {metrica.titulo}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    <ContadorAnimado 
                      valor={metrica.valor} 
                      esPorcentaje={metrica.esPorcentaje || false}
                      duracion={1500 + index * 200}
                    />
                  </p>
                  <p className="text-xs text-muted-foreground">
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
                const alturas = [60, 80, 45, 90, 70, 55, 40];
                return (
                  <div key={dia} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full bg-primary/80 rounded-t-md hover:bg-primary transition-all duration-500"
                      style={{ 
                        height: `${alturas[index]}%`,
                        animation: `grow-bar 0.8s ease-out ${index * 100}ms forwards`,
                        transform: "scaleY(0)",
                        transformOrigin: "bottom"
                      }}
                    />
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
