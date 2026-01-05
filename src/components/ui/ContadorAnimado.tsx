/**
 * ContadorAnimado.tsx
 * 
 * Componente que muestra un número con animación de conteo.
 * Ideal para métricas y estadísticas en dashboards.
 */

import { useContadorAnimado } from "@/hooks/useContadorAnimado";

interface PropiedadesContador {
  /** Valor numérico a mostrar */
  valor: number;
  /** Duración de la animación en ms */
  duracion?: number;
  /** Si el valor es un porcentaje */
  esPorcentaje?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

const ContadorAnimado = ({
  valor,
  duracion = 1500,
  esPorcentaje = false,
  className = "",
}: PropiedadesContador) => {
  const valorAnimado = useContadorAnimado({
    valorFinal: valor,
    duracion,
    esPorcentaje,
  });

  return <span className={className}>{valorAnimado}</span>;
};

export default ContadorAnimado;
