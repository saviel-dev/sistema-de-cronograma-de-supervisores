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
}

const actividadesMineras = [
    "Subida",
    "Inducción",
    "Perforación",
    "Bajada",
    "Descanso",
    "Turno Normal",
];

const supervisores = [
    "Carlos Mendoza",
    "Ana García",
    "Roberto Silva",
    "María López",
    "Juan Pérez",
    "Laura Torres",
];

export function NuevoTurnoDialog({ open, onOpenChange }: NuevoTurnoDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nuevo Turno / Actividad</DialogTitle>
                    <DialogDescription>
                        Agrega un nuevo turno o actividad al cronograma del supervisor.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supervisor" className="text-right">
                            Supervisor
                        </Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccionar supervisor" />
                            </SelectTrigger>
                            <SelectContent>
                                {supervisores.map((sup) => (
                                    <SelectItem key={sup} value={sup}>
                                        {sup}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dia" className="text-right">
                            Día
                        </Label>
                        <Select>
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
                        <Select>
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
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => onOpenChange(false)}>
                        Guardar Turno
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
