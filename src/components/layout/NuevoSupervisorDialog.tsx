import { useState, useEffect } from "react";
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
import { useSupervisores } from "@/hooks/useData";

interface NuevoSupervisorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    supervisorEditar?: any;
}

const cicloOptions = [
    "Subida",
    "Inducción",
    "Perforación",
    "Bajada",
    "Descanso"
];

const regimenOptions = [
    "14x7",
    "7x7",
    "20x10",
    "5x2"
];

export function NuevoSupervisorDialog({ open, onOpenChange, supervisorEditar }: NuevoSupervisorDialogProps) {
    const { addSupervisor, updateSupervisor } = useSupervisores();

    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        identificacion: "",
        correo: "",
        telefono: "",
        regimen: "",
        estadoCiclo: ""
    });

    // Cargar datos al editar
    useEffect(() => {
        if (supervisorEditar) {
            setFormData({
                nombre: supervisorEditar.nombre || "",
                identificacion: supervisorEditar.identificacion || "",
                correo: supervisorEditar.correo || "",
                telefono: supervisorEditar.telefono || "",
                regimen: supervisorEditar.regimen || "",
                estadoCiclo: supervisorEditar.estadoCiclo || "Descanso"
            });
        } else {
            setFormData({
                nombre: "",
                identificacion: "",
                correo: "",
                telefono: "",
                regimen: "14x7",
                estadoCiclo: "Subida"
            });
        }
    }, [supervisorEditar, open]);

    const handleSave = () => {
        // Validacion basica
        if (!formData.nombre || !formData.estadoCiclo) return;

        const data = {
            ...formData,
            // Mapeamos estadoCiclo a 'estado' para compatibilidad con codigo existente si es necesario,
            // pero idealmente usaremos estadoCiclo como la fuente de verdad.
            estado: formData.estadoCiclo === "Descanso" ? "inactivo" : "activo",
            departamento: "Perforación" // Default
        };

        if (supervisorEditar) {
            updateSupervisor(supervisorEditar.id, data);
        } else {
            addSupervisor({
                ...data,
                turnosAsignados: 0 // Inicial
            });
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{supervisorEditar ? "Editar Supervisor" : "Nuevo Supervisor"}</DialogTitle>
                    <DialogDescription>
                        Ingrese los datos del supervisor y su estado actual en el ciclo.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombre" className="text-right">Nombre</Label>
                        <Input
                            id="nombre"
                            className="col-span-3"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="id" className="text-right">ID / DNI</Label>
                        <Input
                            id="id"
                            className="col-span-3"
                            value={formData.identificacion}
                            onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Correo</Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            value={formData.correo}
                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telefono" className="text-right">Teléfono</Label>
                        <Input
                            id="telefono"
                            className="col-span-3"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="regimen" className="text-right">Régimen</Label>
                        <Select
                            value={formData.regimen}
                            onValueChange={(v) => setFormData({ ...formData, regimen: v })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccionar régimen" />
                            </SelectTrigger>
                            <SelectContent>
                                {regimenOptions.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ciclo" className="text-right">Estado Ciclo</Label>
                        <Select
                            value={formData.estadoCiclo}
                            onValueChange={(v) => setFormData({ ...formData, estadoCiclo: v })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccionar etapa" />
                            </SelectTrigger>
                            <SelectContent>
                                {cicloOptions.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>
                        {supervisorEditar ? "Guardar Cambios" : "Crear Supervisor"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
