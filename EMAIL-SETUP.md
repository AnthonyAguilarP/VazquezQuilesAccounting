# 📧 Sistema de Email - Vázquez Quiles Accounting

## ✅ Estado: CONFIGURADO Y FUNCIONANDO

Tu sistema de email está completamente configurado y listo para usar.

## 🔧 Configuración

### Variables de Entorno (.env)
```env
MAILER_USER=mailercolibri@gmail.com
MAILER_PASS=xqjrbzkahunvuxjt
```

### Configuración SMTP
- **Host:** smtp.gmail.com
- **Puerto:** 587
- **Seguridad:** TLS (no SSL)
- **Autenticación:** Contraseña de aplicación de Gmail

## 📁 Archivos del Sistema

### 1. `src/utils/email.ts` - Configuración Principal
- ✅ Transportador de Nodemailer configurado
- ✅ Templates de email HTML profesionales
- ✅ Función `sendContactEmail()` para formularios de contacto  
- ✅ Función `sendCustomEmail()` para emails personalizados
- ✅ Manejo de errores y logging

### 2. `src/pages/api/send-email.ts` - Endpoint API
- ✅ Endpoint POST para enviar emails
- ✅ Validación de campos requeridos
- ✅ Validación de formato de email
- ✅ Respuestas JSON estructuradas
- ✅ Manejo de errores HTTP

### 3. `src/components/ContactForm.astro` - Formulario Frontend
- ✅ Formulario HTML completo
- ✅ JavaScript para envío asíncrono
- ✅ Estados de carga y mensajes de éxito/error
- ✅ Validación del lado cliente

## 🚀 Cómo Usar el Sistema

### Opción 1: Desde tu formulario de contacto
```javascript
// El formulario ya está configurado en ContactForm.astro
// Envía automáticamente a /api/send-email
```

### Opción 2: Llamada directa a la API
```javascript
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Juan Pérez',
    email: 'cliente@example.com',
    telefono: '787-123-4567',
    servicio: 'Contabilidad',
    mensaje: 'Necesito ayuda con mis impuestos'
  })
});

const result = await response.json();
```

### Opción 3: Uso directo desde servidor
```javascript
import { sendContactEmail, sendCustomEmail } from './src/utils/email.js';

// Email de contacto
await sendContactEmail({
  nombre: 'Cliente',
  email: 'cliente@email.com',
  mensaje: 'Consulta sobre servicios'
});

// Email personalizado
await sendCustomEmail({
  to: 'destinatario@email.com',
  subject: 'Asunto personalizado',
  html: '<h1>Mi email personalizado</h1>'
});
```

## 📋 Funcionalidades Incluidas

### ✅ Emails Automáticos
1. **Email de confirmación al cliente** - Confirma que recibiste su mensaje
2. **Email de notificación al negocio** - Te notifica de nuevas consultas

### ✅ Templates Profesionales
- Diseño responsive con HTML/CSS
- Logo de la empresa (si está disponible)
- Información de contacto
- Branding consistente
- Mensajes en español

### ✅ Validaciones
- Campos requeridos (nombre, email, mensaje)
- Formato de email válido
- Manejo de errores robusto

### ✅ Seguridad
- Variables de entorno para credenciales
- Validación del lado servidor
- Logging de errores para debugging

## 🧪 Pruebas

### Ejecutar prueba simple:
```bash
node simple-test.js
```

### Ejecutar prueba completa:
```bash
npx tsx test-email.js
```

## 🎯 Destinatarios Configurados

### Emails de Negocio van a:
- anthonyaguilarparrales2005@gmail.com
- mailercolibri@gmail.com

### Email de Confirmación va a:
- La dirección que proporcione el cliente en el formulario

## 📱 Comandos Útiles

```bash
# Instalar dependencias (si es necesario)
npm install nodemailer @types/nodemailer dotenv tsx

# Probar el sistema
node simple-test.js

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## 🔒 Seguridad

### Variables de Entorno
- ✅ Credenciales almacenadas en `.env`
- ✅ Archivo `.env` en `.gitignore`
- ✅ Contraseña de aplicación (no contraseña principal)

### Gmail App Password
- ✅ Contraseña de aplicación generada correctamente
- ✅ Sin espacios en la configuración
- ✅ Autenticación de 2 factores habilitada

## 🎉 ¡Sistema Listo!

Tu sistema de email está **100% funcional**. Puedes:

1. ✅ Recibir emails de formularios de contacto
2. ✅ Enviar confirmaciones automáticas a clientes  
3. ✅ Recibir notificaciones de nuevas consultas
4. ✅ Enviar emails personalizados cuando sea necesario

---

**¿Necesitas ayuda?** Revisa los archivos de prueba o consulta los logs en la consola del servidor.