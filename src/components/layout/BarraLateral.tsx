/**
 * BarraLateral.tsx
 * 
 * Componente de navegación lateral principal.
 * Utiliza iconos de Lucide (similar a Ionicons) para una estética moderna.
 * En pantallas pequeñas se colapsa mediante un botón hamburguesa.
 */

import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  HelpCircle, 
  Users, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Definición de los elementos de navegación
const elementosNavegacion = [
  {
    titulo: "Resumen General",
    ruta: "/",
    icono: LayoutDashboard,
  },
  {
    titulo: "Cronograma",
    ruta: "/cronograma",
    icono: Calendar,
  },
  {
    titulo: "Supervisores",
    ruta: "/supervisores",
    icono: Users,
  },
  {
    titulo: "Configuración",
    ruta: "/configuracion",
    icono: Settings,
  },
  {
    titulo: "Ayuda",
    ruta: "/ayuda",
    icono: HelpCircle,
  },
];

interface PropiedadesBarraLateral {
  estaColapsada: boolean;
  alternarColapso: () => void;
}

const BarraLateral = ({ estaColapsada, alternarColapso }: PropiedadesBarraLateral) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 shadow-md",
        estaColapsada ? "w-16" : "w-64"
      )}
    >
      {/* Encabezado de la barra lateral con logo y botón de colapso */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!estaColapsada && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground text-sm">
              Cronograma
            </span>
          </div>
        )}
        
        {/* Botón para colapsar/expandir la sidebar */}
        <button
          onClick={alternarColapso}
          className={cn(
            "p-2 rounded-lg hover:bg-accent transition-colors text-sidebar-foreground",
            estaColapsada && "mx-auto"
          )}
          aria-label={estaColapsada ? "Expandir menú" : "Colapsar menú"}
        >
          {estaColapsada ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Lista de navegación */}
      <nav className="p-3 space-y-1">
        {elementosNavegacion.map((elemento) => (
          <NavLink
            key={elemento.ruta}
            to={elemento.ruta}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <elemento.icono className="h-5 w-5 flex-shrink-0" />
            {!estaColapsada && (
              <span className="text-sm font-medium truncate">
                {elemento.titulo}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default BarraLateral;
