/**
 * Ayuda.tsx
 * 
 * Centro de ayuda con preguntas frecuentes y recursos de soporte.
 */

import { HelpCircle, Book, MessageCircle, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Preguntas frecuentes
const preguntasFrecuentes = [
  {
    pregunta: "¿Cómo puedo agregar un nuevo supervisor al sistema?",
    respuesta: "Para agregar un nuevo supervisor, ve a la sección 'Supervisores' en el menú lateral y haz clic en el botón 'Agregar Supervisor'. Completa el formulario con los datos requeridos y guarda los cambios.",
  },
  {
    pregunta: "¿Cómo modifico un turno ya asignado?",
    respuesta: "En la sección 'Cronograma', haz clic sobre el turno que deseas modificar. Se abrirá un panel de edición donde podrás cambiar el supervisor, horario o eliminar el turno si es necesario.",
  },
  {
    pregunta: "¿El sistema detecta conflictos de horarios automáticamente?",
    respuesta: "Sí, el sistema valida automáticamente que un supervisor no tenga turnos superpuestos y respeta los tiempos mínimos de descanso entre turnos según la configuración establecida.",
  },
  {
    pregunta: "¿Puedo exportar el cronograma a Excel o PDF?",
    respuesta: "Sí, en la sección de Cronograma encontrarás opciones para exportar la programación en formatos Excel, PDF o CSV. También puedes configurar reportes automáticos en la sección de Configuración.",
  },
  {
    pregunta: "¿Cómo configuro las notificaciones del sistema?",
    respuesta: "Accede a Configuración > Notificaciones para personalizar qué alertas deseas recibir y por qué medio (correo electrónico, notificaciones en la app, etc.).",
  },
  {
    pregunta: "¿Qué hago si olvidé mi contraseña?",
    respuesta: "En la pantalla de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?' e ingresa tu correo electrónico. Recibirás un enlace para restablecer tu contraseña.",
  },
];

// Recursos de ayuda
const recursos = [
  {
    titulo: "Documentación",
    descripcion: "Guías detalladas sobre todas las funcionalidades",
    icono: Book,
    accion: "Ver documentación",
  },
  {
    titulo: "Chat de Soporte",
    descripcion: "Habla con nuestro equipo en tiempo real",
    icono: MessageCircle,
    accion: "Iniciar chat",
  },
  {
    titulo: "Correo de Soporte",
    descripcion: "soporte@cronograma.com",
    icono: Mail,
    accion: "Enviar correo",
  },
];

const Ayuda = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Centro de Ayuda
        </h2>
        <p className="text-muted-foreground mt-1">
          Encuentra respuestas a tus preguntas y obtén soporte.
        </p>
      </div>

      {/* Búsqueda de ayuda */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              ¿En qué podemos ayudarte?
            </h3>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Escribe tu pregunta..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preguntas frecuentes */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Preguntas Frecuentes</CardTitle>
          <CardDescription>
            Las consultas más comunes de nuestros usuarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {preguntasFrecuentes.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {item.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Recursos de ayuda */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recursos Adicionales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recursos.map((recurso) => (
            <Card
              key={recurso.titulo}
              className="border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-5 text-center space-y-3">
                <div className="p-3 rounded-lg bg-primary/10 w-12 h-12 mx-auto flex items-center justify-center">
                  <recurso.icono className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{recurso.titulo}</h4>
                  <p className="text-sm text-muted-foreground">{recurso.descripcion}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  {recurso.accion}
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Información de contacto */}
      <Card className="border-border shadow-sm bg-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-foreground">
                ¿No encontraste lo que buscabas?
              </h4>
              <p className="text-sm text-muted-foreground">
                Nuestro equipo de soporte está disponible de lunes a viernes de 8:00 a 18:00
              </p>
            </div>
            <Button className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Contactar Soporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ayuda;
