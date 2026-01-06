/**
 * Supervisores.tsx
 * 
 * Página para gestionar la lista de supervisores del sistema.
 * Muestra una tabla con información de cada supervisor.
 * Incluye animaciones de entrada y conteo en las estadísticas.
 */

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Mail, Phone, Edit, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NuevoSupervisorDialog } from "@/components/layout/NuevoSupervisorDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContadorAnimado from "@/components/ui/ContadorAnimado";
import { useSupervisores } from "@/hooks/useData";

// Eliminada la importación estática
// import { supervisores } from "@/data/mockData";

// Mapeo de estados a variantes de badge
const variantesEstado: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  activo: "default",
  vacaciones: "secondary",
  inactivo: "outline",
};



const Supervisores = () => {
  const { supervisores, deleteSupervisor } = useSupervisores();
  const [isNuevoSupervisorOpen, setIsNuevoSupervisorOpen] = useState(false);
  const [supervisorEditar, setSupervisorEditar] = useState<any>(null);

  // Lógica de Validación: Exactamente 2 supervisores en "Perforación"
  const supervisoresPerforando = supervisores.filter(s => s.estadoCiclo === "Perforación");
  const numPerforando = supervisoresPerforando.length;
  const esValido = numPerforando === 2;

  const handleEditar = (supervisor: any) => {
    setSupervisorEditar(supervisor);
    setIsNuevoSupervisorOpen(true);
  };

  const handleNuevo = () => {
    setSupervisorEditar(null);
    setIsNuevoSupervisorOpen(true);
  };

  const contadores = {
    total: supervisores.length,
    perforacion: numPerforando,
    descanso: supervisores.filter(s => s.estadoCiclo === 'Descanso').length,
    otros: supervisores.length - numPerforando - (supervisores.filter(s => s.estadoCiclo === 'Descanso').length)
  };
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado con controles */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in"
        style={{ animationDelay: "0ms" }}
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Gestión de Supervisores
          </h2>
          <p className="text-muted-foreground mt-1">
            Administra el equipo de supervisores y sus asignaciones.
          </p>
        </div>

        <Button className="gap-2" onClick={handleNuevo}>
          <Plus className="h-4 w-4" />
          <span>Agregar Supervisor</span>
        </Button>

        <NuevoSupervisorDialog
          open={isNuevoSupervisorOpen}
          onOpenChange={setIsNuevoSupervisorOpen}
          supervisorEditar={supervisorEditar}
        />
      </div>

      {/* Alerta de Validación de Reglas de Negocio */}
      {!esValido && (
        <Alert variant="destructive" className="animate-fade-in border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Configuración Inválida de Perforación</AlertTitle>
          <AlertDescription>
            Se requiere <strong>exactamente 2 supervisores</strong> en estado "Perforación".
            Actualmente hay <strong>{numPerforando}</strong>.
          </AlertDescription>
        </Alert>
      )}

      {esValido && (
        <Alert className="animate-fade-in border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400">
          <CheckCircle className="h-4 w-4 stroke-green-600 dark:stroke-green-400" />
          <AlertTitle>Configuración Óptima</AlertTitle>
          <AlertDescription>
            El ciclo de perforación cumple con la regla de 2 supervisores activos.
          </AlertDescription>
        </Alert>
      )}

      {/* Barra de búsqueda y filtros */}
      <div
        className="flex flex-col sm:flex-row gap-3 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o departamento..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <select className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm">
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="vacaciones">En vacaciones</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <select className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm">
          <option value="">Todos los ciclos</option>
          <option value="Perforación">Perforación</option>
          <option value="Descanso">Descanso</option>
          <option value="Subida">Subida</option>
        </select>
      </div>

      {/* Estadísticas rápidas con contadores animados */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card
          className="border-border shadow-sm animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              <ContadorAnimado valor={contadores.total} duracion={1200} />
            </p>
            <p className="text-sm text-muted-foreground">Total Supervisores</p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm animate-fade-in" style={{ animationDelay: "150ms" }}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              <ContadorAnimado valor={contadores.perforacion} duracion={1400} />
            </p>
            <p className="text-sm text-muted-foreground">Perforando</p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-chart-2">
              <ContadorAnimado valor={contadores.descanso} duracion={1000} />
            </p>
            <p className="text-sm text-muted-foreground">Descanso</p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm animate-fade-in" style={{ animationDelay: "250ms" }}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              <ContadorAnimado valor={contadores.otros} duracion={1000} />
            </p>
            <p className="text-sm text-muted-foreground">Otros Ciclos</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de supervisores en cards con animaciones escalonadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {supervisores.map((supervisor, index) => (
          <Card
            key={supervisor.id}
            className="border-border shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            style={{ animationDelay: `${400 + index * 100}ms` }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar con iniciales */}
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {supervisor.nombre.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <CardTitle className="text-base text-foreground">
                      {supervisor.nombre}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      ID: {supervisor.identificacion || "S/N"}
                    </p>
                  </div>
                </div>

                {/* Menú de acciones */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2" onClick={() => handleEditar(supervisor)}>
                      <Edit className="h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2 text-destructive"
                      onClick={() => deleteSupervisor(supervisor.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Información de contacto */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{supervisor.correo}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{supervisor.telefono}</span>
                </div>
              </div>

              {/* Estado y turnos */}
              {/* Estado y turnos reemplazados por Ciclo y Régimen */}
              <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">Ciclo Actual</span>
                  <Badge
                    variant={supervisor.estadoCiclo === 'Perforación' ? 'default' : 'outline'}
                    className={`${supervisor.estadoCiclo === 'Perforación' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                  >
                    {supervisor.estadoCiclo || "Desconocido"}
                  </Badge>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">Régimen</span>
                  <span className="text-sm font-bold bg-muted px-2 py-0.5 rounded-md">{supervisor.regimen || "14x7"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Supervisores;
