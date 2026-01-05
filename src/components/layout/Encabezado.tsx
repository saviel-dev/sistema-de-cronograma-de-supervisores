/**
 * Encabezado.tsx
 * 
 * Componente de encabezado superior de la aplicación.
 * Contiene el botón hamburguesa para dispositivos móviles,
 * título de la sección actual y controles de usuario.
 */

import { Menu, Bell, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropiedadesEncabezado {
  estaColapsada: boolean;
  alternarMenuMovil: () => void;
  tituloSeccion?: string;
}

const Encabezado = ({ 
  estaColapsada, 
  alternarMenuMovil, 
  tituloSeccion = "Panel Principal" 
}: PropiedadesEncabezado) => {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-card border-b border-border transition-all duration-300",
        estaColapsada ? "left-16" : "left-64",
        // En móviles, el encabezado ocupa todo el ancho
        "max-lg:left-0"
      )}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Sección izquierda: botón hamburguesa (móvil) y título */}
        <div className="flex items-center gap-4">
          {/* Botón hamburguesa visible solo en móviles */}
          <button
            onClick={alternarMenuMovil}
            className="p-2 rounded-lg hover:bg-accent transition-colors lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          
          <h1 className="text-lg font-semibold text-foreground">
            {tituloSeccion}
          </h1>
        </div>

        {/* Sección derecha: búsqueda, notificaciones y perfil */}
        <div className="flex items-center gap-2">
          {/* Campo de búsqueda (oculto en móviles pequeños) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/50 border border-border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm w-40 lg:w-56 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Botón de notificaciones */}
          <button className="p-2 rounded-lg hover:bg-accent transition-colors relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {/* Indicador de notificaciones pendientes */}
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </button>

          {/* Avatar de usuario */}
          <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent transition-colors">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Encabezado;
