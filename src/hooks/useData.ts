import { useState, useEffect } from "react";
import { StorageService } from "../services/storage.service";
import { useToast } from "@/hooks/use-toast";

export const useSupervisores = () => {
    const [supervisores, setSupervisores] = useState<any[]>(StorageService.getSupervisores());
    const { toast } = useToast();

    useEffect(() => {
        const handleUpdate = () => {
            setSupervisores(StorageService.getSupervisores());
        };

        window.addEventListener("storage-supervisores-update", handleUpdate);
        return () => window.removeEventListener("storage-supervisores-update", handleUpdate);
    }, []);

    const addSupervisor = (supervisor: any) => {
        const nuevos = [...supervisores, { ...supervisor, id: Date.now() }];
        StorageService.saveSupervisores(nuevos);
        StorageService.addActivity({
            usuario: supervisor.nombre,
            accion: "agregó supervisor",
            tipo: "supervisor"
        });

        // Notificar
        const settings = StorageService.getNotificationSettings();
        if (settings.showToasts) {
            toast({
                title: "✓ Supervisor agregado",
                description: `${supervisor.nombre} ha sido registrado exitosamente`,
            });
        }
    };

    const updateSupervisor = (id: number, data: any) => {
        const nuevos = supervisores.map(s => s.id === id ? { ...s, ...data } : s);
        StorageService.saveSupervisores(nuevos);
        StorageService.addActivity({
            usuario: data.nombre || "Supervisor",
            accion: "editó supervisor",
            tipo: "supervisor"
        });

        // Notificar
        const settings = StorageService.getNotificationSettings();
        if (settings.showToasts) {
            toast({
                title: "✓ Supervisor actualizado",
                description: `Los cambios han sido guardados`,
            });
        }
    };

    const deleteSupervisor = (id: number) => {
        const supervisor = supervisores.find(s => s.id === id);
        const nuevos = supervisores.filter(s => s.id !== id);
        StorageService.saveSupervisores(nuevos);
        StorageService.addActivity({
            usuario: supervisor?.nombre || "Supervisor",
            accion: "eliminó supervisor",
            tipo: "supervisor"
        });

        // Notificar
        const settings = StorageService.getNotificationSettings();
        if (settings.showToasts) {
            toast({
                title: "⚠️ Supervisor eliminado",
                description: `${supervisor?.nombre || 'El supervisor'} ha sido removido del sistema`,
                variant: "destructive",
            });
        }
    };

    return { supervisores, addSupervisor, updateSupervisor, deleteSupervisor };
};

export const useTurnos = () => {
    const [turnos, setTurnos] = useState<any[]>(StorageService.getTurnos());
    const { toast } = useToast();

    useEffect(() => {
        const handleUpdate = () => {
            setTurnos(StorageService.getTurnos());
        };

        window.addEventListener("storage-turnos-update", handleUpdate);
        return () => window.removeEventListener("storage-turnos-update", handleUpdate);
    }, []);

    const addTurno = (turno: any) => {
        // Aseguramos que tenga ID único si no lo tiene
        const nuevoTurno = { ...turno, id: turno.id || Date.now() };
        const nuevos = [...turnos, nuevoTurno];
        StorageService.saveTurnos(nuevos);
        StorageService.addActivity({
            usuario: turno.supervisor || "Sistema",
            accion: "creó turno",
            tipo: "turno"
        });

        // Notificar
        const settings = StorageService.getNotificationSettings();
        if (settings.showToasts) {
            toast({
                title: "✓ Turno programado",
                description: `Turno asignado a ${turno.supervisor || 'supervisor'}`,
            });
        }
    };

    const updateTurno = (id: number, data: any) => {
        const nuevos = turnos.map(t => t.id === id ? { ...t, ...data } : t);
        StorageService.saveTurnos(nuevos);
        StorageService.addActivity({
            usuario: data.supervisor || "Sistema",
            accion: "editó turno",
            tipo: "turno"
        });

        // Notificar
        const settings = StorageService.getNotificationSettings();
        if (settings.showToasts) {
            toast({
                title: "✓ Turno actualizado",
                description: "Los cambios han sido guardados",
            });
        }
    };

    const deleteTurno = (id: number) => {
        const turno = turnos.find(t => t.id === id);
        const nuevos = turnos.filter(t => t.id !== id);
        StorageService.saveTurnos(nuevos);
        StorageService.addActivity({
            usuario: turno?.supervisor || "Sistema",
            accion: "eliminó turno",
            tipo: "turno"
        });

        // Notificar
        const settings = StorageService.getNotificationSettings();
        if (settings.showToasts) {
            toast({
                title: "⚠️ Turno eliminado",
                description: "El turno ha sido removido del cronograma",
                variant: "destructive",
            });
        }
    };

    return { turnos, addTurno, updateTurno, deleteTurno };
};
