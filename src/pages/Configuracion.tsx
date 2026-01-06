/**
 * Configuracion.tsx
 * 
 * Página de configuración del sistema donde el usuario puede
 * ajustar las preferencias generales de la aplicación.
 */

import { Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { StorageService } from "@/services/storage.service";
import { useNotifications } from "@/hooks/useNotifications";

const Configuracion = () => {
  // Estados para las diferentes opciones de configuración
  const [showToasts, setShowToasts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [shiftReminders, setShiftReminders] = useState(true);
  const { notifySuccess } = useNotifications();

  // Cargar configuración al montar
  useEffect(() => {
    const settings = StorageService.getNotificationSettings();
    setShowToasts(settings.showToasts);
    setEmailNotifications(settings.emailNotifications);
    setShiftReminders(settings.shiftReminders);
  }, []);

  // Guardar configuración cuando cambie
  const handleToggle = (key: string, value: boolean) => {
    const settings = StorageService.getNotificationSettings();
    const updated = { ...settings, [key]: value };
    StorageService.saveNotificationSettings(updated);

    // Actualizar estado local
    if (key === 'showToasts') setShowToasts(value);
    if (key === 'emailNotifications') setEmailNotifications(value);
    if (key === 'shiftReminders') setShiftReminders(value);

    // Notificar al usuario (solo si los toasts están activados)
    if (updated.showToasts) {
      notifySuccess("Configuración guardada", "Tus preferencias han sido actualizadas");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado de la página */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Configuración
        </h2>
        <p className="text-muted-foreground mt-1">
          Administra las preferencias generales y el funcionamiento del sistema.
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
            <Label htmlFor="toasts" className="flex flex-col gap-1">
              <span className="text-foreground">Notificaciones en pantalla</span>
              <span className="text-sm text-muted-foreground">
                Muestra alertas visuales cuando ocurren eventos importantes
              </span>
            </Label>
            <Switch
              id="toasts"
              checked={showToasts}
              onCheckedChange={(val) => handleToggle('showToasts', val)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notificaciones" className="flex flex-col gap-1">
              <span className="text-foreground">Notificaciones por correo</span>
              <span className="text-sm text-muted-foreground">
                Recibe alertas importantes en tu correo electrónico
              </span>
            </Label>
            <Switch
              id="notificaciones"
              checked={emailNotifications}
              onCheckedChange={(val) => handleToggle('emailNotifications', val)}
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
              checked={shiftReminders}
              onCheckedChange={(val) => handleToggle('shiftReminders', val)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuracion;
