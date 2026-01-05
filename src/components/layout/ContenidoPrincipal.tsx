/**
 * ContenidoPrincipal.tsx
 * 
 * Contenedor principal que envuelve el contenido de cada página.
 * Se adapta automáticamente al estado de la barra lateral (colapsada/expandida).
 */

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PropiedadesContenidoPrincipal {
  children: ReactNode;
  estaColapsada: boolean;
}

const ContenidoPrincipal = ({ children, estaColapsada }: PropiedadesContenidoPrincipal) => {
  return (
    <main
      className={cn(
        "min-h-screen pt-16 transition-all duration-300 bg-background",
        // Ajuste del margen izquierdo según el estado de la sidebar
        estaColapsada ? "lg:ml-16" : "lg:ml-64",
        // En móviles no hay margen lateral ya que la sidebar es overlay
        "max-lg:ml-0"
      )}
    >
      <div className="p-4 lg:p-6">
        {children}
      </div>
    </main>
  );
};

export default ContenidoPrincipal;
