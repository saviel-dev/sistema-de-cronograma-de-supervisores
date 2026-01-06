/**
 * App.tsx
 * 
 * Componente raíz de la aplicación.
 * Configura los proveedores globales, el sistema de rutas
 * y el layout principal con la barra lateral.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
 import { AuthProvider } from "@/contexts/AuthContext";
 import { ProtectedRoute } from "@/components/ProtectedRoute";

// Layout principal
import LayoutPrincipal from "./components/layout/LayoutPrincipal";
import { ThemeProvider } from "@/components/theme-provider";

// Páginas de la aplicación
import ResumenGeneral from "./pages/ResumenGeneral";
import Cronograma from "./pages/Cronograma";
import Supervisores from "./pages/Supervisores";
import GeneradorCronograma from "./pages/GeneradorCronograma";
import Configuracion from "./pages/Configuracion";
import Ayuda from "./pages/Ayuda";
import NotFound from "./pages/NotFound";
 import Login from "./pages/Login";

// Cliente de React Query para manejo de estado del servidor
const queryClient = new QueryClient();

const ProtectedLayout = () => (
  <ProtectedRoute>
    <LayoutPrincipal>
      <Outlet />
    </LayoutPrincipal>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Componentes de notificaciones toast */}
      <Toaster />
      <Sonner />

      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedLayout />}>
                {/* Página principal - Resumen general */}
                <Route path="/" element={<ResumenGeneral />} />

                {/* Cronograma de supervisores */}
                <Route path="/cronograma" element={<Cronograma />} />

                {/* Gestión de supervisores */}
                <Route path="/supervisores" element={<Supervisores />} />

                {/* Generador automático de cronogramas */}
                <Route path="/generador" element={<GeneradorCronograma />} />

                {/* Configuración del sistema */}
                <Route path="/configuracion" element={<Configuracion />} />

                {/* Centro de ayuda */}
                <Route path="/ayuda" element={<Ayuda />} />

                {/* Ruta 404 para páginas no encontradas */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
