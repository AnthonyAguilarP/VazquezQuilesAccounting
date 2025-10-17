// test-email.js - Script para probar el envío de emails
import { sendContactEmail, sendCustomEmail } from './src/utils/email.ts';
import 'dotenv/config'; // Cargar variables de entorno

async function testContactEmail() {
  console.log('🧪 Iniciando prueba de email de contacto...\n');

  try {
    const testData = {
      nombre: 'Juan Pérez',
      email: 'test@example.com', // Cambia por tu email para probar
      telefono: '787-123-4567',
      servicio: 'Contabilidad',
      mensaje: 'Este es un mensaje de prueba para verificar que el sistema de email funciona correctamente.'
    };

    console.log('📧 Enviando email de prueba con los siguientes datos:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n⏳ Enviando...\n');

    const result = await sendContactEmail(testData);
    
    console.log('✅ ¡Email enviado exitosamente!');
    console.log('📊 Resultado:');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Error en la prueba:');
    console.error(error.message);
    console.log('\n🔍 Posibles soluciones:');
    console.log('1. Verificar que las variables MAILER_USER y MAILER_PASS estén en el .env');
    console.log('2. Confirmar que la contraseña de aplicación de Gmail sea correcta');
    console.log('3. Verificar la conexión a internet');
  }
}

async function testCustomEmail() {
  console.log('\n🧪 Iniciando prueba de email personalizado...\n');

  try {
    const customEmail = {
      to: 'test@example.com', // Cambia por tu email
      subject: 'Email de prueba personalizado',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">¡Hola desde Vázquez Quiles Accounting!</h2>
          <p>Este es un email de prueba personalizado para verificar que el sistema funciona.</p>
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            <p style="margin: 0;"><strong>Sistema:</strong> Email personalizado</p>
          </div>
          <p style="color: #64748b; font-size: 12px;">
            Este mensaje fue enviado automáticamente desde el sistema de pruebas.
          </p>
        </div>
      `
    };

    console.log('📧 Enviando email personalizado...\n');

    const result = await sendCustomEmail(customEmail);
    
    console.log('✅ ¡Email personalizado enviado exitosamente!');
    console.log('📊 Resultado:');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Error enviando email personalizado:');
    console.error(error.message);
  }
}

// Función para mostrar configuración actual
function showConfiguration() {
  console.log('⚙️  Configuración actual:');
  console.log(`📧 Usuario: ${process.env.MAILER_USER}`);
  console.log(`🔐 Contraseña: ${process.env.MAILER_PASS ? '****' + process.env.MAILER_PASS.slice(-4) : 'No configurada'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Función principal
async function runTests() {
  console.log('🚀 SISTEMA DE PRUEBA DE EMAIL - Vázquez Quiles Accounting');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  showConfiguration();

  // Ejecutar pruebas
  await testContactEmail();
  await testCustomEmail();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Pruebas completadas');
  console.log('\n💡 Recuerda cambiar "test@example.com" por un email real para ver los resultados.');
}

// Ejecutar las pruebas
runTests().catch(console.error);

export { testContactEmail, testCustomEmail, runTests };
