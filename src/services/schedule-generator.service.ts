/**
 * schedule-generator.service.ts
 * 
 * Servicio para la generación automatizada de cronogramas de supervisores de perforación.
 * Implementa reglas de negocio críticas como "siempre 2 perforando".
 */

// Tipos y definiciones
export type EstadoCiclo = 'S' | 'I' | 'P' | 'B' | 'D';

export interface Supervisor {
    id: number;
    nombre: string;
    regimen: string; // "14x7", "7x7", etc.
    estadoCiclo?: EstadoCiclo;
}

export interface ScheduleConfig {
    supervisores: Supervisor[];
    diasInduccion: number;
    diasPerforacionMinimos: number;
    diasTotales: number;
}

export interface ScheduleCell {
    dia: number;
    supervisorId: number;
    supervisorNombre: string;
    estado: EstadoCiclo;
}

export interface ValidationError {
    tipo: 'REGLA_2_PERFORANDO' | 'SECUENCIA_INVALIDA' | 'PERFORACION_INSUFICIENTE';
    dia?: number;
    supervisorId?: number;
    mensaje: string;
    gravedad: 'CRITICO' | 'ERROR' | 'WARNING';
}

export interface ScheduleResult {
    grid: ScheduleCell[][]; // [supervisor][dia]
    perforandoPorDia: number[];
    errores: ValidationError[];
    valido: boolean;
}

/**
 * Parsea un régimen "NxM" y retorna N (días trabajando) y M (días descanso)
 */
function parseRegimen(regimen: string): { diasTrabajo: number; diasDescanso: number } {
    const match = regimen.match(/(\d+)x(\d+)/i);
    if (!match) {
        return { diasTrabajo: 14, diasDescanso: 7 }; // Default
    }
    return {
        diasTrabajo: parseInt(match[1]),
        diasDescanso: parseInt(match[2])
    };
}

/**
 * Genera el cronograma completo
 */
export function generarCronograma(config: ScheduleConfig): ScheduleResult {
    const { supervisores, diasInduccion, diasTotales } = config;

    // Inicializar grilla vacía
    const grid: ScheduleCell[][] = [];

    // Calcular offset inicial para cada supervisor para escalonarlos
    const offsets = calcularOffsets(supervisores, diasInduccion);

    // Generar cronograma para cada supervisor
    supervisores.forEach((supervisor, index) => {
        const { diasTrabajo, diasDescanso } = parseRegimen(supervisor.regimen);
        const offset = offsets[index];
        const row: ScheduleCell[] = [];

        for (let dia = 1; dia <= diasTotales; dia++) {
            const diaAjustado = dia - offset;
            const estado = calcularEstado(diaAjustado, diasTrabajo, diasDescanso, diasInduccion);

            row.push({
                dia,
                supervisorId: supervisor.id,
                supervisorNombre: supervisor.nombre,
                estado
            });
        }

        grid.push(row);
    });

    // Calcular cantidad de perforando por día
    const perforandoPorDia = calcularPerforandoPorDia(grid, diasTotales);

    // Validar cronograma
    const errores = validarCronograma(grid, perforandoPorDia, config);

    return {
        grid,
        perforandoPorDia,
        errores,
        valido: errores.filter(e => e.gravedad === 'CRITICO').length === 0
    };
}

/**
 * Calcula el offset (día de inicio) para cada supervisor
 * El objetivo es escalonarlos para mantener siempre 2 perforando
 */
function calcularOffsets(supervisores: Supervisor[], diasInduccion: number): number[] {
    const offsets: number[] = [];

    supervisores.forEach((supervisor, index) => {
        const { diasTrabajo } = parseRegimen(supervisor.regimen);

        if (index === 0) {
            // Primer supervisor empieza en día 1
            offsets.push(0);
        } else if (index === 1) {
            // Segundo supervisor debe empezar cuando el primero esté cerca de terminar su perforación
            // Para mantener el solapamiento
            const diasAntesDeB = Math.floor(diasTrabajo * 0.6); // 60% del ciclo
            offsets.push(diasAntesDeB);
        } else {
            // Supervisores adicionales: escalonar basado en el ciclo
            const cicloAnterior = parseRegimen(supervisores[index - 1].regimen).diasTrabajo;
            const offsetAnterior = offsets[index - 1];
            offsets.push(offsetAnterior + Math.floor(cicloAnterior / 2));
        }
    });

    return offsets;
}

/**
 * Calcula el estado de un supervisor en un día específico según su ciclo
 */
function calcularEstado(
    diaEnCiclo: number,
    diasTrabajo: number,
    diasDescanso: number,
    diasInduccion: number
): EstadoCiclo {
    const cicloDuracion = diasTrabajo + diasDescanso;

    // Si el día es negativo (antes del inicio), está en descanso
    if (diaEnCiclo < 1) {
        return 'D';
    }

    // Posición dentro del ciclo
    const posicion = ((diaEnCiclo - 1) % cicloDuracion) + 1;

    if (posicion === 1) {
        return 'S'; // Subida
    } else if (posicion >= 2 && posicion <= 1 + diasInduccion) {
        return 'I'; // Inducción
    } else if (posicion > 1 + diasInduccion && posicion < diasTrabajo) {
        return 'P'; // Perforación
    } else if (posicion === diasTrabajo) {
        return 'B'; // Bajada
    } else {
        return 'D'; // Descanso
    }
}

/**
 * Cuenta cuántos supervisores están perforando cada día
 */
function calcularPerforandoPorDia(grid: ScheduleCell[][], diasTotales: number): number[] {
    const perforandoPorDia: number[] = [];

    for (let dia = 1; dia <= diasTotales; dia++) {
        let conteo = 0;
        grid.forEach(row => {
            if (row[dia - 1]?.estado === 'P') {
                conteo++;
            }
        });
        perforandoPorDia.push(conteo);
    }

    return perforandoPorDia;
}

/**
 * Valida el cronograma generado
 */
function validarCronograma(
    grid: ScheduleCell[][],
    perforandoPorDia: number[],
    config: ScheduleConfig
): ValidationError[] {
    const errores: ValidationError[] = [];

    // Validación 1: Regla "Siempre 2 perforando"
    perforandoPorDia.forEach((cantidad, index) => {
        const dia = index + 1;
        if (cantidad !== 2) {
            errores.push({
                tipo: 'REGLA_2_PERFORANDO',
                dia,
                mensaje: `Día ${dia}: ${cantidad} perforando (se requiere exactamente 2)`,
                gravedad: 'CRITICO'
            });
        }
    });

    // Validación 2: Secuencias inválidas por supervisor
    grid.forEach((row, supIndex) => {
        for (let i = 0; i < row.length - 1; i++) {
            const actual = row[i].estado;
            const siguiente = row[i + 1].estado;
            const supervisorId = row[i].supervisorId;

            // No S → S
            if (actual === 'S' && siguiente === 'S') {
                errores.push({
                    tipo: 'SECUENCIA_INVALIDA',
                    dia: i + 1,
                    supervisorId,
                    mensaje: `Supervisor ${row[i].supervisorNombre}, Día ${i + 1}: S → S no permitido`,
                    gravedad: 'ERROR'
                });
            }

            // No S → B
            if (actual === 'S' && siguiente === 'B') {
                errores.push({
                    tipo: 'SECUENCIA_INVALIDA',
                    dia: i + 1,
                    supervisorId,
                    mensaje: `Supervisor ${row[i].supervisorNombre}, Día ${i + 1}: S → B no tiene sentido`,
                    gravedad: 'ERROR'
                });
            }
        }

        // Validación 3: Perforación mínima
        let diasP = 0;
        let inicioSecuencia = 0;

        row.forEach((cell, idx) => {
            if (cell.estado === 'P') {
                if (diasP === 0) inicioSecuencia = idx + 1;
                diasP++;
            } else if (diasP > 0) {
                if (diasP < config.diasPerforacionMinimos) {
                    errores.push({
                        tipo: 'PERFORACION_INSUFICIENTE',
                        dia: inicioSecuencia,
                        supervisorId: cell.supervisorId,
                        mensaje: `Supervisor ${cell.supervisorNombre}: Secuencia de solo ${diasP} día(s) de perforación (mín: ${config.diasPerforacionMinimos})`,
                        gravedad: 'WARNING'
                    });
                }
                diasP = 0;
            }
        });
    });

    return errores;
}

export const ScheduleGeneratorService = {
    generarCronograma
};
