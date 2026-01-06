# Guía de Despliegue en Vercel

Este documento explica cómo desplegar el proyecto Panel Central en Vercel.

## 📋 Pre-requisitos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio Git (GitHub, GitLab o Bitbucket)
- Código subido al repositorio

## 🚀 Método 1: Despliegue desde Vercel Dashboard

### Paso 1: Importar Proyecto
1. Inicia sesión en [Vercel](https://vercel.com)
2. Clic en "Add New..." → "Project"
3. Importa tu repositorio Git
4. Selecciona la rama principal (main/master)

### Paso 2: Configurar el Proyecto
Vercel detectará automáticamente que es un proyecto Vite. Verifica:

**Framework Preset**: Vite
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

### Paso 3: Variables de Entorno (Opcional)
Si necesitas variables de entorno, agrégalas en esta sección.

### Paso 4: Deploy
1. Clic en "Deploy"
2. Espera a que termine el build (1-3 minutos)
3. ¡Listo! Tu aplicación está en línea

## 🔧 Método 2: Despliegue desde CLI

### Instalación de Vercel CLI

```bash
npm install -g vercel
```

### Login

```bash
vercel login
```

### Despliegue

```bash
# Desde el directorio del proyecto
vercel

# Para producción
vercel --prod
```

## ⚙️ Configuración

El archivo `vercel.json` ya está configurado para:
- ✅ Servir archivos estáticos desde `/dist`
- ✅ Redireccionar todas las rutas a `index.html` (SPA routing)
- ✅ Compatibilidad con React Router

## 🔄 Despliegues Automáticos

### Ramas
- **main/master**: Se despliega automáticamente a producción
- **Otras ramas**: Preview deployments automáticos

### Pull Requests
Cada PR genera un preview deployment automático.

## 🌐 Dominio Personalizado

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Configura DNS según las instrucciones

## 📊 Monitoreo

Vercel provee:
- **Analytics**: Tráfico y métricas
- **Logs**: Logs en tiempo real
- **Performance**: Web Vitals

Accede desde el dashboard del proyecto.

## ⚠️ Consideraciones Importantes

### LocalStorage
El proyecto usa LocalStorage para persistencia de datos. Esto significa:
- ✅ Funciona perfectamente en producción
- ⚠️ Los datos son locales al navegador del usuario
- ⚠️ No hay sincronización entre dispositivos
- ℹ️ Para datos compartidos, implementa un backend

### Build Size
El bundle de producción debería ser ~500KB-1MB. Si es mayor:
```bash
npm run build
# Revisa el tamaño en dist/
```

### Troubleshooting

**Error: Routes not working**
- Verifica que `vercel.json` esté en la raíz del proyecto
- Asegúrate de que las rutas redirijan a `/index.html`

**Error: Build failed**
- Revisa que todas las dependencias estén en `package.json`
- Ejecuta `npm run build` localmente primero

**Error: Blank page**
- Abre DevTools Console
- Verifica errores de rutas de assets
- Asegúrate de que `base` en `vite.config.ts` esté correcto

## 🔗 Enlaces Útiles

- [Documentación Vercel](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Troubleshooting](https://vercel.com/support)

## ✅ Checklist de Deployment

Antes de desplegar:
- [ ] Código pushed al repositorio
- [ ] `npm run build` funciona localmente
- [ ] Todos los tests pasan
- [ ] `.gitignore` incluye `/node_modules` y `/dist`
- [ ] `vercel.json` está configurado
- [ ] README.md actualizado

¡Listo para desplegar! 🎉
