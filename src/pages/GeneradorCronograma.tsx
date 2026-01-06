/**
 * GeneradorCronograma.tsx
 * 
 * Página principal del generador automatizado de cronogramas.
 * Permite configurar parámetros y visualizar el cronograma generado.
 */

import { useState } from "react";
import { Calendar, AlertTriangle, CheckCircle, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSupervisores } from "@/hooks/useData";
import {
    ScheduleGeneratorService,
    ScheduleResult,
    EstadoCiclo
} from "@/services/schedule-generator.service";

// Mapeo de colores por estado
const estadoColores: Record<EstadoCiclo, string> = {
    'S': 'bg-blue-400 text-white',        // Subida
    'I': 'bg-yellow-400 text-black',      // Inducción
    'P': 'bg-emerald-500 text-white',     // Perforación
    'B': 'bg-orange-400 text-white',      // Bajada
    'D': 'bg-gray-300 text-gray-700'      // Descanso
};

const estadoNombres: Record<EstadoCiclo, string> = {
    'S': 'Subida',
    'I': 'Inducción',
    'P': 'Perforación',
    'B': 'Bajada',
    'D': 'Descanso'
};

const GeneradorCronograma = () => {
    const { supervisores } = useSupervisores();

    // Configuración
    const [diasInduccion, setDiasInduccion] = useState(2);
    const [diasPerforacionMinimos, setDiasPerforacionMinimos] = useState(10);
    const [diasTotales, setDiasTotales] = useState(30);

    // Resultado
    const [resultado, setResultado] = useState<ScheduleResult | null>(null);

    const handleGenerar = () => {
        // Filtrar solo supervisores activos o con régimen definido
        const supervisoresValidos = supervisores.filter(s => s.regimen);

        if (supervisoresValidos.length === 0) {
            alert("No hay supervisores con régimen definido. Por favor, crea supervisores primero.");
            return;
        }

        const cronograma = ScheduleGeneratorService.generarCronograma({
            supervisores: supervisoresValidos,
            diasInduccion,
            diasPerforacionMinimos,
            diasTotales
        });

        setResultado(cronograma);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Encabezado */}
            <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
                <h2 className="text-2xl font-bold text-foreground">
                    Generador Automático de Cronogramas
                </h2>
                <p className="text-muted-foreground mt-1">
                    Configura los parámetros y genera un cronograma que cumple la regla "siempre 2 perforando".
                </p>
            </div>

            {/* Configuración */}
            <Card className="animate-fade-in border-border shadow-sm" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Configuración
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="induccion">Días de Inducción</Label>
                            <Input
                                id="induccion"
                                type="number"
                                min="1"
                                max="5"
                                value={diasInduccion}
                                onChange={(e) => setDiasInduccion(parseInt(e.target.value) || 2)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="minPerf">Días Mínimos de Perforación</Label>
                            <Input
                                id="minPerf"
                                type="number"
                                min="5"
                                max="20"
                                value={diasPerforacionMinimos}
                                onChange={(e) => setDiasPerforacionMinimos(parseInt(e.target.value) || 10)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="total">Total de Días a Proyectar</Label>
                            <Input
                                id="total"
                                type="number"
                                min="14"
                                max="90"
                                value={diasTotales}
                                onChange={(e) => setDiasTotales(parseInt(e.target.value) || 30)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <p className="text-sm text-muted-foreground mb-3">
                            Supervisores a incluir: <strong>{supervisores.filter(s => s.regimen).length}</strong> supervisores con régimen definido
                        </p>
                        <Button onClick={handleGenerar} className="gap-2">
                            <Play className="h-4 w-4" />
                            Calcular Cronograma
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Leyenda */}
            {resultado && (
                <Card className="animate-fade-in border-border shadow-sm" style={{ animationDelay: "200ms" }}>
                    <CardContent className="pt-6">
                        <div className="flex gap-4 flex-wrap">
                            <span className="text-sm font-medium text-muted-foreground">Leyenda:</span>
                            {(Object.keys(estadoColores) as EstadoCiclo[]).map(estado => (
                                <div key={estado} className="flex items-center gap-2">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${estadoColores[estado]}`}>
                                        {estado}
                                    </div>
                                    <span className="text-sm text-foreground">{estadoNombres[estado]}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Alertas de Errores */}
            {resultado && resultado.errores.length > 0 && (
                <Alert
                    variant={resultado.valido ? "default" : "destructive"}
                    className="animate-fade-in"
                    style={{ animationDelay: "300ms" }}
                >
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>
                        {resultado.errores.filter(e => e.gravedad === 'CRITICO').length > 0
                            ? `Errores Críticos Detectados (${resultado.errores.filter(e => e.gravedad === 'CRITICO').length})`
                            : `Advertencias (${resultado.errores.length})`}
                    </AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc list-inside mt-2 space-y-1 max-h-40 overflow-y-auto">
                            {resultado.errores.slice(0, 10).map((error, idx) => (
                                <li key={idx} className="text-sm">
                                    {error.mensaje}
                                </li>
                            ))}
                            {resultado.errores.length > 10 && (
                                <li className="text-sm italic">...y {resultado.errores.length - 10} más</li>
                            )}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            {/* Mensaje de Éxito */}
            {resultado && resultado.valido && (
                <Alert className="animate-fade-in bg-emerald-50 border-emerald-200 text-emerald-800" style={{ animationDelay: "300ms" }}>
                    <CheckCircle className="h-4 w-4 stroke-emerald-600" />
                    <AlertTitle>Cronograma Válido</AlertTitle>
                    <AlertDescription>
                        El cronograma cumple con todas las reglas críticas. ✓ Siempre 2 supervisores perforando.
                    </AlertDescription>
                </Alert>
            )}

            {/* Grilla del Cronograma */}
            {resultado && (
                <Card className="animate-fade-in border-border shadow-sm overflow-hidden" style={{ animationDelay: "400ms" }}>
                    <CardHeader>
                        <CardTitle>Cronograma Generado</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                                <thead>
                                    <tr className="bg-muted">
                                        <th className="border border-border p-2 text-left font-semibold sticky left-0 bg-muted z-10">
                                            Supervisor
                                        </th>
                                        {Array.from({ length: diasTotales }, (_, i) => (
                                            <th key={i} className="border border-border p-2 text-center font-medium min-w-[40px]">
                                                D{i + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultado.grid.map((row, supIndex) => (
                                        <tr key={supIndex} className="hover:bg-accent/50">
                                            <td className="border border-border p-2 font-medium sticky left-0 bg-background z-10">
                                                {row[0].supervisorNombre}
                                            </td>
                                            {row.map((cell) => (
                                                <td
                                                    key={`${cell.supervisorId}-${cell.dia}`}
                                                    className="border border-border p-0"
                                                >
                                                    <div
                                                        className={`flex items-center justify-center h-10 font-bold ${estadoColores[cell.estado]}`}
                                                        title={estadoNombres[cell.estado]}
                                                    >
                                                        {cell.estado}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}

                                    {/* Fila de resumen */}
                                    <tr className="bg-muted font-bold">
                                        <td className="border border-border p-2 sticky left-0 bg-muted z-10">
                                            # Perforando
                                        </td>
                                        {resultado.perforandoPorDia.map((cantidad, idx) => (
                                            <td
                                                key={idx}
                                                className={`border border-border p-0`}
                                            >
                                                <div
                                                    className={`flex items-center justify-center h-10 text-sm font-bold ${cantidad === 2
                                                            ? 'bg-emerald-100 text-emerald-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {cantidad}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default GeneradorCronograma;
