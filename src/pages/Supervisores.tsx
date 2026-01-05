/**
 * Supervisores.tsx
 * 
 * Página para gestionar la lista de supervisores del sistema.
 * Muestra una tabla con información de cada supervisor.
 * Incluye animaciones de entrada y conteo en las estadísticas.
 */

import { Plus, Search, MoreHorizontal, Mail, Phone, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContadorAnimado from "@/components/ui/ContadorAnimado";

// Datos de demostración de supervisores
const supervisores = [
  {
    id: 1,
    nombre: "Carlos Mendoza",
    correo: "carlos.mendoza@empresa.com",
    telefono: "+51 999 888 777",
    departamento: "Producción",
    estado: "activo",
    turnosAsignados: 8,
  },
  {
    id: 2,
    nombre: "Ana García",
    correo: "ana.garcia@empresa.com",
    telefono: "+51 999 777 666",
    departamento: "Calidad",
    estado: "activo",
    turnosAsignados: 6,
  },
  {
    id: 3,
    nombre: "Roberto Silva",
    correo: "roberto.silva@empresa.com",
    telefono: "+51 999 666 555",
    departamento: "Logística",
    estado: "activo",
    turnosAsignados: 7,
  },
  {
    id: 4,
    nombre: "María López",
    correo: "maria.lopez@empresa.com",
    telefono: "+51 999 555 444",
    departamento: "Producción",
    estado: "vacaciones",
    turnosAsignados: 0,
  },
  {
    id: 5,
    nombre: "Juan Pérez",
    correo: "juan.perez@empresa.com",
    telefono: "+51 999 444 333",
    departamento: "Mantenimiento",
    estado: "activo",
    turnosAsignados: 5,
  },
  {
    id: 6,
    nombre: "Laura Torres",
    correo: "laura.torres@empresa.com",
    telefono: "+51 999 333 222",
    departamento: "Calidad",
    estado: "inactivo",
    turnosAsignados: 0,
  },
];

// Mapeo de estados a variantes de badge
const variantesEstado: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  activo: "default",
  vacaciones: "secondary",
  inactivo: "outline",
};

const Supervisores = () => {
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

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Agregar Supervisor</span>
        </Button>
      </div>

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
          <option value="">Todos los departamentos</option>
          <option value="produccion">Producción</option>
          <option value="calidad">Calidad</option>
          <option value="logistica">Logística</option>
          <option value="mantenimiento">Mantenimiento</option>
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
              <ContadorAnimado valor={6} duracion={1200} />
            </p>
            <p className="text-sm text-muted-foreground">Total Supervisores</p>
          </CardContent>
        </Card>
        <Card 
          className="border-border shadow-sm animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              <ContadorAnimado valor={4} duracion={1400} />
            </p>
            <p className="text-sm text-muted-foreground">Activos</p>
          </CardContent>
        </Card>
        <Card 
          className="border-border shadow-sm animate-fade-in"
          style={{ animationDelay: "250ms" }}
        >
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-chart-2">
              <ContadorAnimado valor={1} duracion={1000} />
            </p>
            <p className="text-sm text-muted-foreground">En Vacaciones</p>
          </CardContent>
        </Card>
        <Card 
          className="border-border shadow-sm animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted">
              <ContadorAnimado valor={1} duracion={1000} />
            </p>
            <p className="text-sm text-muted-foreground">Inactivos</p>
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
                      {supervisor.departamento}
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
                    <DropdownMenuItem className="gap-2">
                      <Edit className="h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
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
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Badge variant={variantesEstado[supervisor.estado]}>
                  {supervisor.estado.charAt(0).toUpperCase() + supervisor.estado.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {supervisor.turnosAsignados} turnos asignados
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Supervisores;
