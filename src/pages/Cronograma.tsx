/**
 * Cronograma.tsx
 * 
 * Página que muestra el cronograma semanal de supervisores.
 * Presenta una vista de calendario con los turnos asignados.
 * Incluye animaciones de entrada y conteo animado en las cifras.
 */

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContadorAnimado from "@/components/ui/ContadorAnimado";

// Días de la semana para el encabezado del calendario
const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Datos de demostración para los turnos programados
const turnosDemostracion = [
  { dia: 0, supervisor: "Carlos M.", horario: "06:00 - 14:00", tipo: "mañana" },
  { dia: 0, supervisor: "Ana G.", horario: "14:00 - 22:00", tipo: "tarde" },
  { dia: 1, supervisor: "Roberto S.", horario: "06:00 - 14:00", tipo: "mañana" },
  { dia: 1, supervisor: "María L.", horario: "14:00 - 22:00", tipo: "tarde" },
  { dia: 1, supervisor: "Juan P.", horario: "22:00 - 06:00", tipo: "noche" },
  { dia: 2, supervisor: "Laura T.", horario: "06:00 - 14:00", tipo: "mañana" },
  { dia: 2, supervisor: "Carlos M.", horario: "14:00 - 22:00", tipo: "tarde" },
  { dia: 3, supervisor: "Ana G.", horario: "06:00 - 14:00", tipo: "mañana" },
  { dia: 3, supervisor: "Roberto S.", horario: "14:00 - 22:00", tipo: "tarde" },
  { dia: 4, supervisor: "María L.", horario: "06:00 - 14:00", tipo: "mañana" },
  { dia: 4, supervisor: "Juan P.", horario: "14:00 - 22:00", tipo: "tarde" },
  { dia: 4, supervisor: "Laura T.", horario: "22:00 - 06:00", tipo: "noche" },
  { dia: 5, supervisor: "Carlos M.", horario: "08:00 - 16:00", tipo: "mañana" },
  { dia: 6, supervisor: "Ana G.", horario: "08:00 - 16:00", tipo: "mañana" },
];

// Colores según el tipo de turno
const coloresTurno: Record<string, string> = {
  mañana: "bg-chart-1/20 border-chart-1 text-chart-5",
  tarde: "bg-chart-2/20 border-chart-2 text-chart-5",
  noche: "bg-secondary/20 border-secondary text-secondary-foreground",
};

const Cronograma = () => {
  const [semanaActual, setSemanaActual] = useState(0);

  // Obtener los turnos para un día específico
  const obtenerTurnosPorDia = (indiceDia: number) => {
    return turnosDemostracion.filter((turno) => turno.dia === indiceDia);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado con controles de navegación */}
      <div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in"
        style={{ animationDelay: "0ms" }}
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Cronograma Semanal
          </h2>
          <p className="text-muted-foreground mt-1">
            Gestiona los turnos de supervisión para cada día de la semana.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Navegación entre semanas */}
          <div className="flex items-center gap-1 bg-card rounded-lg border border-border p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSemanaActual(semanaActual - 1)}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-3 text-sm font-medium text-foreground">
              Semana {semanaActual === 0 ? "Actual" : semanaActual > 0 ? `+${semanaActual}` : semanaActual}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSemanaActual(semanaActual + 1)}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Botón para agregar nuevo turno */}
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nuevo Turno</span>
          </Button>
        </div>
      </div>

      {/* Leyenda de tipos de turno */}
      <div 
        className="flex flex-wrap gap-4 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-1" />
          <span className="text-sm text-muted-foreground">Turno Mañana</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-2" />
          <span className="text-sm text-muted-foreground">Turno Tarde</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-muted-foreground">Turno Noche</span>
        </div>
      </div>

      {/* Calendario semanal con animaciones escalonadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        {diasSemana.map((dia, indice) => {
          const turnosDelDia = obtenerTurnosPorDia(indice);
          const esFinDeSemana = indice >= 5;

          return (
            <Card
              key={dia}
              className={`border-border shadow-sm animate-fade-in ${esFinDeSemana ? "bg-accent/30" : ""}`}
              style={{ animationDelay: `${200 + indice * 80}ms` }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground">
                  {dia}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {turnosDelDia.length > 0 ? (
                  turnosDelDia.map((turno, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-md border-l-4 ${coloresTurno[turno.tipo]} cursor-pointer hover:scale-[1.02] transition-transform animate-fade-in`}
                      style={{ animationDelay: `${300 + indice * 80 + idx * 50}ms` }}
                    >
                      <p className="text-sm font-medium">{turno.supervisor}</p>
                      <p className="text-xs opacity-80">{turno.horario}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Sin turnos
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumen de la semana con contadores animados */}
      <Card 
        className="border-border shadow-sm animate-fade-in"
        style={{ animationDelay: "800ms" }}
      >
        <CardHeader>
          <CardTitle className="text-foreground">Resumen de la Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <p className="text-2xl font-bold text-foreground">
                <ContadorAnimado valor={14} duracion={1500} />
              </p>
              <p className="text-sm text-muted-foreground">Turnos Totales</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <p className="text-2xl font-bold text-foreground">
                <ContadorAnimado valor={6} duracion={1200} />
              </p>
              <p className="text-sm text-muted-foreground">Supervisores</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <p className="text-2xl font-bold text-foreground">
                <ContadorAnimado valor={98} duracion={1800} esPorcentaje />
              </p>
              <p className="text-sm text-muted-foreground">Cobertura</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <p className="text-2xl font-bold text-foreground">
                <ContadorAnimado valor={0} duracion={800} />
              </p>
              <p className="text-sm text-muted-foreground">Conflictos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cronograma;
