/**
 * useNotifications.ts
 * 
 * Hook para gestionar notificaciones en tiempo real usando toast.
 * Respeta las preferencias del usuario almacenadas en LocalStorage.
 */

import { useToast } from "@/hooks/use-toast";
import { StorageService } from "@/services/storage.service";

export interface NotificationConfig {
    title: string;
    description: string;
    variant?: 'default' | 'destructive';
}

export function useNotifications() {
    const { toast } = useToast();

    const notify = (config: NotificationConfig) => {
        // Verificar preferencias del usuario
        const settings = StorageService.getNotificationSettings();

        if (!settings.showToasts) {
            return; // Usuario desactivó notificaciones
        }

        toast({
            title: config.title,
            description: config.description,
            variant: config.variant || 'default',
        });
    };

    const notifySuccess = (title: string, description: string) => {
        notify({ title: `✓ ${title}`, description, variant: 'default' });
    };

    const notifyError = (title: string, description: string) => {
        notify({ title: `⚠️ ${title}`, description, variant: 'destructive' });
    };

    return {
        notify,
        notifySuccess,
        notifyError
    };
}
