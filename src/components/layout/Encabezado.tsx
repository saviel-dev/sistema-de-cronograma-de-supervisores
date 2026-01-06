/**
 * Encabezado.tsx
 * 
 * Componente de encabezado superior de la aplicación.
 * Contiene el botón hamburguesa para dispositivos móviles,
 * título de la sección actual y controles de usuario.
 */

import { Menu, Bell, User, Search, X, CheckCircle, Clock, Calendar, AlertTriangle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupervisores, useTurnos } from "@/hooks/useData";
import { StorageService } from "@/services/storage.service";
import { useAuth } from "@/contexts/AuthContext";

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
  const [consulta, setConsulta] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const [actividadReciente, setActividadReciente] = useState<any[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const notificacionesRef = useRef<HTMLDivElement>(null);
  const menuUsuarioRef = useRef<HTMLDivElement>(null);
  const { supervisores } = useSupervisores();
  const { turnos } = useTurnos();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Cargar actividad reciente
  useEffect(() => {
    const loadActivity = () => {
      const log = StorageService.getActivityLog();
      setActividadReciente(log.slice(0, 10)); // Últimas 10
    };
    loadActivity();
    window.addEventListener("storage-activity-update", loadActivity);
    return () => window.removeEventListener("storage-activity-update", loadActivity);
  }, []);

  // Cerrar resultados al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setMostrarResultados(false);
      }
      if (notificacionesRef.current && !notificacionesRef.current.contains(event.target as Node)) {
        setMostrarNotificaciones(false);
      }
      if (menuUsuarioRef.current && !menuUsuarioRef.current.contains(event.target as Node)) {
        setMostrarMenuUsuario(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, notificacionesRef, menuUsuarioRef]);

  const manejarLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const manejarBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setConsulta(valor);

    if (valor.trim() === "") {
      setResultados([]);
      setMostrarResultados(false);
      return;
    }

    const term = valor.toLowerCase();

    // Buscar en supervisores
    const resultadosSupervisores = supervisores
      .filter(s =>
        s.nombre.toLowerCase().includes(term) ||
        s.departamento.toLowerCase().includes(term) ||
        s.correo.toLowerCase().includes(term)
      )
      .map(s => ({
        tipo: 'Supervisor',
        titulo: s.nombre,
        subtitulo: s.departamento,
        link: '/supervisores' // En un futuro podría ser /supervisores/{id}
      }));

    // Buscar en turnos
    const resultadosTurnos = turnos
      .filter(t =>
        t.supervisor.toLowerCase().includes(term) ||
        t.tipo.toLowerCase().includes(term)
      )
      .map(t => {
        const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        return {
          tipo: 'Turno',
          titulo: `${t.supervisor} - ${t.tipo}`,
          subtitulo: `${dias[t.dia]} ${t.horario}`,
          link: '/cronograma'
        };
      });

    setResultados([...resultadosSupervisores, ...resultadosTurnos]);
    setMostrarResultados(true);
  };

  const limpiarBusqueda = () => {
    setConsulta("");
    setResultados([]);
    setMostrarResultados(false);
  };

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
          <div ref={wrapperRef} className="hidden sm:flex flex-col relative">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/50 border border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar..."
                value={consulta}
                onChange={manejarBusqueda}
                onFocus={() => consulta && setMostrarResultados(true)}
                className="bg-transparent border-none outline-none text-sm w-40 lg:w-56 text-foreground placeholder:text-muted-foreground"
              />
              {consulta && (
                <button onClick={limpiarBusqueda} aria-label="Limpiar búsqueda">
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Dropdown de resultados */}
            {mostrarResultados && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden max-h-96 overflow-y-auto z-50 w-64 lg:w-full">
                {resultados.length > 0 ? (
                  <div className="py-1">
                    {resultados.map((resultado, index) => (
                      <Link
                        key={index}
                        to={resultado.link}
                        onClick={() => setMostrarResultados(false)}
                        className="block px-4 py-2 hover:bg-accent transition-colors"
                      >
                        <p className="text-sm font-medium text-foreground">{resultado.titulo}</p>
                        <div className="flex justify-between items-center mt-0.5">
                          <p className="text-xs text-muted-foreground">{resultado.subtitulo}</p>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border border-border/50 px-1 rounded">
                            {resultado.tipo}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                    No se encontraron resultados
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botón de notificaciones con dropdown */}
          <div className="relative" ref={notificacionesRef}>
            <button
              onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
              className="p-2 rounded-lg hover:bg-accent transition-colors relative"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              {/* Indicador de notificaciones pendientes */}
              {actividadReciente.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              )}
            </button>

            {/* Dropdown de notificaciones */}
            {mostrarNotificaciones && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50 animate-fade-in">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">Actividad Reciente</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {actividadReciente.length > 0 ? (
                    actividadReciente.map((item, index) => {
                      const IconoActividad = item.accion.includes("eliminó") ? AlertTriangle :
                        item.accion.includes("editó") ? Clock :
                          item.accion.includes("creó") ? Calendar : CheckCircle;

                      const diff = Date.now() - item.timestamp;
                      const minutos = Math.floor(diff / 60000);
                      const horas = Math.floor(minutos / 60);
                      let tiempo = "Hace unos segundos";
                      if (minutos < 60) tiempo = `Hace ${minutos} min`;
                      else if (horas < 24) tiempo = `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
                      else tiempo = `Hace ${Math.floor(horas / 24)} día${Math.floor(horas / 24) > 1 ? 's' : ''}`;

                      return (
                        <div
                          key={index}
                          className="p-3 hover:bg-accent/50 transition-colors border-b border-border last:border-0"
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "p-2 rounded-full",
                              item.accion.includes("eliminó") ? "bg-red-100 dark:bg-red-900/20" : "bg-primary/10"
                            )}>
                              <IconoActividad className={cn(
                                "h-4 w-4",
                                item.accion.includes("eliminó") ? "text-red-600 dark:text-red-400" : "text-primary"
                              )} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {item.usuario}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.accion}
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-1">
                                {tiempo}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-6 text-center">
                      <Bell className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No hay actividad reciente</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Avatar de usuario + menú */}
          <div className="relative" ref={menuUsuarioRef}>
            <button
              onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent transition-all duration-200 hover:scale-105 group"
              aria-label="Menú de usuario"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center transition-all duration-200 group-hover:bg-red-500">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </button>

            {mostrarMenuUsuario && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-50 animate-fade-in overflow-hidden">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user ?? "Usuario"}
                  </p>
                  <p className="text-xs text-muted-foreground">Sesión activa</p>
                </div>

                <button
                  onClick={manejarLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Encabezado;
