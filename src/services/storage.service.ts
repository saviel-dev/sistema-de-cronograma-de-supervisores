// Iniciamos sin datos (sistema desde 0)

const KEYS = {
    SUPERVISORES: "panel-central-supervisores-v2",
    TURNOS: "panel-central-turnos-v2",
    ACTIVITY_LOG: "panel-central-activity-log-v2",
    NOTIFICATION_SETTINGS: "panel-central-notification-settings",
};

export const StorageService = {
    // Supervisores
    getSupervisores: () => {
        const data = localStorage.getItem(KEYS.SUPERVISORES);
        if (!data) {
            // Retornar array vacío por defecto
            localStorage.setItem(KEYS.SUPERVISORES, JSON.stringify([]));
            return [];
        }
        return JSON.parse(data);
    },

    saveSupervisores: (data: any[]) => {
        localStorage.setItem(KEYS.SUPERVISORES, JSON.stringify(data));
        // Disparar evento para sincronizar pestañas/componentes
        window.dispatchEvent(new Event("storage-supervisores-update"));
    },

    // Turnos
    getTurnos: () => {
        const data = localStorage.getItem(KEYS.TURNOS);
        if (!data) {
            // Retornar array vacío por defecto
            localStorage.setItem(KEYS.TURNOS, JSON.stringify([]));
            return [];
        }
        return JSON.parse(data);
    },

    saveTurnos: (data: any[]) => {
        localStorage.setItem(KEYS.TURNOS, JSON.stringify(data));
        window.dispatchEvent(new Event("storage-turnos-update"));
    },

    // Activity Log
    getActivityLog: () => {
        const data = localStorage.getItem(KEYS.ACTIVITY_LOG);
        if (!data) {
            localStorage.setItem(KEYS.ACTIVITY_LOG, JSON.stringify([]));
            return [];
        }
        return JSON.parse(data);
    },

    addActivity: (activity: any) => {
        const log = StorageService.getActivityLog();
        const newActivity = {
            id: Date.now(),
            timestamp: Date.now(),
            ...activity
        };
        // Mantener solo las últimas 20 actividades
        const updatedLog = [newActivity, ...log].slice(0, 20);
        localStorage.setItem(KEYS.ACTIVITY_LOG, JSON.stringify(updatedLog));
        window.dispatchEvent(new Event("storage-activity-update"));
    },

    // Notification Settings
    getNotificationSettings: () => {
        const data = localStorage.getItem(KEYS.NOTIFICATION_SETTINGS);
        if (!data) {
            const defaults = {
                enabled: true,
                emailNotifications: false,
                shiftReminders: true,
                showToasts: true
            };
            localStorage.setItem(KEYS.NOTIFICATION_SETTINGS, JSON.stringify(defaults));
            return defaults;
        }
        return JSON.parse(data);
    },

    saveNotificationSettings: (settings: any) => {
        localStorage.setItem(KEYS.NOTIFICATION_SETTINGS, JSON.stringify(settings));
        window.dispatchEvent(new Event("storage-settings-update"));
    },

    // Limpiar todo
    clear: () => {
        localStorage.removeItem(KEYS.SUPERVISORES);
        localStorage.removeItem(KEYS.TURNOS);
        localStorage.removeItem(KEYS.ACTIVITY_LOG);
        window.location.reload();
    }
};
