/**
 * Configuracion.tsx
 * 
 * Página de configuración del sistema donde el usuario puede
 * ajustar las preferencias generales de la aplicación.
 */

import { Save, Bell, Moon, Sun, Globe, Shield, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const Configuracion = () => {
  // Estados para las diferentes opciones de configuración
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [recordatorios, setRecordatorios] = useState(true);
  const [reportesAutomaticos, setReportesAutomaticos] = useState(false);

  // Manejador para guardar cambios
  const guardarCambios = () => {
    toast.success("Configuración guardada correctamente");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Encabezado de la página */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Configuración del Sistema
        </h2>
        <p className="text-muted-foreground mt-1">
          Personaliza las preferencias y comportamiento de la aplicación.
        </p>
      </div>

      {/* Sección de Notificaciones */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo y cuándo recibir alertas del sistema
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notificaciones" className="flex flex-col gap-1">
              <span className="text-foreground">Notificaciones por correo</span>
              <span className="text-sm text-muted-foreground">
                Recibe alertas importantes en tu correo electrónico
              </span>
            </Label>
            <Switch
              id="notificaciones"
              checked={notificaciones}
              onCheckedChange={setNotificaciones}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="recordatorios" className="flex flex-col gap-1">
              <span className="text-foreground">Recordatorios de turno</span>
              <span className="text-sm text-muted-foreground">
                Aviso 1 hora antes del inicio de cada turno
              </span>
            </Label>
            <Switch
              id="recordatorios"
              checked={recordatorios}
              onCheckedChange={setRecordatorios}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sección de Apariencia */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {modoOscuro ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-foreground">Apariencia</CardTitle>
              <CardDescription>
                Personaliza la apariencia visual de la aplicación
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="modoOscuro" className="flex flex-col gap-1">
              <span className="text-foreground">Modo oscuro</span>
              <span className="text-sm text-muted-foreground">
                Cambia entre tema claro y oscuro
              </span>
            </Label>
            <Switch
              id="modoOscuro"
              checked={modoOscuro}
              onCheckedChange={setModoOscuro}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sección de Idioma y Región */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Idioma y Región</CardTitle>
              <CardDescription>
                Configura preferencias de localización
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Idioma</Label>
              <select className="w-full p-2 rounded-lg border border-border bg-card text-foreground">
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Zona horaria</Label>
              <select className="w-full p-2 rounded-lg border border-border bg-card text-foreground">
                <option value="america/lima">América/Lima (UTC-5)</option>
                <option value="america/bogota">América/Bogotá (UTC-5)</option>
                <option value="america/mexico">América/México (UTC-6)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Seguridad */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Seguridad</CardTitle>
              <CardDescription>
                Opciones de seguridad y privacidad
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full sm:w-auto">
            Cambiar contraseña
          </Button>
          <Button variant="outline" className="w-full sm:w-auto ml-0 sm:ml-2">
            Configurar autenticación de dos factores
          </Button>
        </CardContent>
      </Card>

      {/* Sección de Datos y Reportes */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Datos y Reportes</CardTitle>
              <CardDescription>
                Configuración de exportación y respaldos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="reportes" className="flex flex-col gap-1">
              <span className="text-foreground">Reportes automáticos</span>
              <span className="text-sm text-muted-foreground">
                Generar y enviar reportes semanales automáticamente
              </span>
            </Label>
            <Switch
              id="reportes"
              checked={reportesAutomaticos}
              onCheckedChange={setReportesAutomaticos}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Exportar datos</Button>
            <Button variant="outline">Crear respaldo manual</Button>
          </div>
        </CardContent>
      </Card>

      {/* Botón de guardar */}
      <div className="flex justify-end pt-4">
        <Button onClick={guardarCambios} className="gap-2">
          <Save className="h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};

export default Configuracion;
