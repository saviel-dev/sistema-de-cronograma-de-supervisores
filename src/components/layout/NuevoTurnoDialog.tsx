import { useState, useEffect } from "react";
import { useTurnos, useSupervisores } from "@/hooks/useData";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface NuevoTurnoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    turnoEditar?: any; // Si existe, es modo edición
}

const actividadesMineras = [
    "Subida",
    "Inducción",
    "Perforación",
    "Bajada",
    "Descanso",
    "Turno Normal",
];

// Eliminado array estatico de supervisores
// const supervisores = [...];

export function NuevoTurnoDialog({ open, onOpenChange, turnoEditar }: NuevoTurnoDialogProps) {
    const { addTurno, updateTurno } = useTurnos();
    const { supervisores } = useSupervisores();

    const [formData, setFormData] = useState({
        supervisor: "",
        dia: "",
        actividad: "",
        horario: "",
        notas: ""
    });

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (turnoEditar) {
            // Mapeamos los datos del turno al formulario
            const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
            setFormData({
                supervisor: turnoEditar.supervisor || "",
                dia: dias[turnoEditar.dia], // Convertir indice a nombre string
                actividad: turnoEditar.tipo || "", // Usamos 'tipo' como actividad por compatibilidad
                horario: turnoEditar.horario || "",
                notas: turnoEditar.notas || ""
            });
        } else {
            // Resetear formulario
            setFormData({
                supervisor: "",
                dia: "",
                actividad: "",
                horario: "",
                notas: ""
            });
        }
    }, [turnoEditar, open]);

    const handleSave = () => {
        const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const indiceDia = dias.indexOf(formData.dia);

        const turnoData = {
            supervisor: formData.supervisor,
            dia: indiceDia,
            tipo: formData.actividad,
            horario: formData.horario,
            notas: formData.notas
        };

        if (turnoEditar) {
            updateTurno(turnoEditar.id, turnoData);
        } else {
            addTurno(turnoData);
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{turnoEditar ? "Editar Turno" : "Nuevo Turno / Actividad"}</DialogTitle>
                    <DialogDescription>
                        {turnoEditar ? "Modifica los detalles del turno." : "Agrega un nuevo turno o actividad al cronograma del supervisor."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supervisor" className="text-right">
                            Supervisor
                        </Label>
                        <Select
                            value={formData.supervisor}
                            onValueChange={(v) => setFormData({ ...formData, supervisor: v })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccionar supervisor" />
                            </SelectTrigger>
                            <SelectContent>
                                {supervisores.map((sup) => (
                                    <SelectItem key={sup.id} value={sup.nombre}>
                                        {sup.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dia" className="text-right">
                            Día
                        </Label>
                        <Select
                            value={formData.dia}
                            onValueChange={(v) => setFormData({ ...formData, dia: v })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccionar día" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Lunes">Lunes</SelectItem>
                                <SelectItem value="Martes">Martes</SelectItem>
                                <SelectItem value="Miércoles">Miércoles</SelectItem>
                                <SelectItem value="Jueves">Jueves</SelectItem>
                                <SelectItem value="Viernes">Viernes</SelectItem>
                                <SelectItem value="Sábado">Sábado</SelectItem>
                                <SelectItem value="Domingo">Domingo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="actividad" className="text-right">
                            Actividad
                        </Label>
                        <Select
                            value={formData.actividad}
                            onValueChange={(v) => setFormData({ ...formData, actividad: v })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Tipo de actividad" />
                            </SelectTrigger>
                            <SelectContent>
                                {actividadesMineras.map((act) => (
                                    <SelectItem key={act} value={act}>
                                        {act}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="horario" className="text-right">
                            Horario
                        </Label>
                        <Input
                            id="horario"
                            placeholder="Ej: 08:00 - 20:00"
                            className="col-span-3"
                            value={formData.horario}
                            onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notas" className="text-right">
                            Notas
                        </Label>
                        <Textarea
                            id="notas"
                            placeholder="Detalles adicionales..."
                            className="col-span-3"
                            value={formData.notas}
                            onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>
                        {turnoEditar ? "Guardar Cambios" : "Guardar Turno"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
