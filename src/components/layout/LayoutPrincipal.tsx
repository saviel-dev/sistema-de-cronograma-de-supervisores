/**
 * LayoutPrincipal.tsx
 * 
 * Componente de layout que orquesta la estructura principal de la aplicación.
 * Maneja el estado de colapso de la sidebar y el menú móvil.
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BarraLateral from "./BarraLateral";
import Encabezado from "./Encabezado";
import ContenidoPrincipal from "./ContenidoPrincipal";
import { cn } from "@/lib/utils";

interface PropiedadesLayout {
  children: React.ReactNode;
}

// Mapeo de rutas a títulos de sección para el encabezado
const titulosPorRuta: Record<string, string> = {
  "/": "Resumen General",
  "/cronograma": "Cronograma de Supervisores",
  "/supervisores": "Gestión de Supervisores",
  "/configuracion": "Configuración del Sistema",
  "/ayuda": "Centro de Ayuda",
};

const LayoutPrincipal = ({ children }: PropiedadesLayout) => {
  // Estado para controlar si la barra lateral está colapsada
  const [estaColapsada, setEstaColapsada] = useState(false);
  
  // Estado para controlar la visibilidad del menú en dispositivos móviles
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  
  const ubicacion = useLocation();
  const tituloSeccion = titulosPorRuta[ubicacion.pathname] || "Panel";

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    setMenuMovilAbierto(false);
  }, [ubicacion.pathname]);

  // Alternar el estado de colapso de la sidebar
  const alternarColapso = () => {
    setEstaColapsada(!estaColapsada);
  };

  // Alternar la visibilidad del menú móvil
  const alternarMenuMovil = () => {
    setMenuMovilAbierto(!menuMovilAbierto);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Overlay oscuro cuando el menú móvil está abierto */}
      {menuMovilAbierto && (
        <div
          className="fixed inset-0 z-30 bg-foreground/50 lg:hidden"
          onClick={() => setMenuMovilAbierto(false)}
        />
      )}

      {/* Barra lateral - visible siempre en desktop, overlay en móvil */}
      <div
        className={cn(
          "lg:block",
          menuMovilAbierto ? "block" : "hidden"
        )}
      >
        <BarraLateral
          estaColapsada={estaColapsada}
          alternarColapso={alternarColapso}
        />
      </div>

      {/* Encabezado superior */}
      <Encabezado
        estaColapsada={estaColapsada}
        alternarMenuMovil={alternarMenuMovil}
        tituloSeccion={tituloSeccion}
      />

      {/* Contenido principal de la página */}
      <ContenidoPrincipal estaColapsada={estaColapsada}>
        {children}
      </ContenidoPrincipal>
    </div>
  );
};

export default LayoutPrincipal;
