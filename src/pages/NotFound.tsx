/**
 * NotFound.tsx
 * 
 * Página de error 404 que se muestra cuando el usuario
 * intenta acceder a una ruta que no existe.
 */

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const ubicacion = useLocation();
  const navegar = useNavigate();

  useEffect(() => {
    console.error("Error 404: Intento de acceso a ruta inexistente:", ubicacion.pathname);
  }, [ubicacion.pathname]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* Código de error grande */}
      <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
      
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Página no encontrada
      </h1>
      
      <p className="text-muted-foreground mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
        Verifica la dirección o regresa al inicio.
      </p>

      {/* Botones de navegación */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={() => navegar(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver atrás
        </Button>
        
        <Button onClick={() => navegar("/")} className="gap-2">
          <Home className="h-4 w-4" />
          Ir al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
