/**
 * useContadorAnimado.ts
 * 
 * Hook personalizado que anima un número desde 0 hasta el valor objetivo.
 * Utiliza easing para una animación suave y natural.
 */

import { useEffect, useState } from "react";

interface OpcionesContador {
  /** Valor final del contador */
  valorFinal: number;
  /** Duración de la animación en milisegundos */
  duracion?: number;
  /** Si el valor contiene símbolo de porcentaje */
  esPorcentaje?: boolean;
}

/**
 * Hook que anima un contador numérico desde 0 hasta un valor objetivo
 * con efecto de easing para una transición suave.
 */
export const useContadorAnimado = ({
  valorFinal,
  duracion = 1500,
  esPorcentaje = false,
}: OpcionesContador): string => {
  const [valorActual, setValorActual] = useState(0);

  useEffect(() => {
    // Reiniciar el contador cuando cambie el valor final
    setValorActual(0);
    
    const tiempoInicio = Date.now();
    const incremento = valorFinal / (duracion / 16); // ~60fps

    const animar = () => {
      const tiempoTranscurrido = Date.now() - tiempoInicio;
      const progreso = Math.min(tiempoTranscurrido / duracion, 1);
      
      // Función de easing: easeOutExpo para desaceleración natural
      const easeOutExpo = 1 - Math.pow(2, -10 * progreso);
      const nuevoValor = Math.floor(valorFinal * easeOutExpo);

      setValorActual(nuevoValor);

      if (progreso < 1) {
        requestAnimationFrame(animar);
      } else {
        setValorActual(valorFinal);
      }
    };

    const animacionId = requestAnimationFrame(animar);

    return () => cancelAnimationFrame(animacionId);
  }, [valorFinal, duracion]);

  return esPorcentaje ? `${valorActual}%` : valorActual.toString();
};

export default useContadorAnimado;
