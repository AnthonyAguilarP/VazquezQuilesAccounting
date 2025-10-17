// simple-test.js - Prueba simple del sistema de email
import { config } from 'dotenv';
import nodemailer from 'nodemailer';

// Cargar variables de entorno
config();

console.log('🔧 Configuración de email:');
console.log('Usuario:', process.env.MAILER_USER);
console.log('Contraseña configurada:', process.env.MAILER_PASS ? 'Sí' : 'No');
console.log('');

// Crear transportador
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  }
});

async function testConnection() {
  try {
    console.log('⏳ Probando conexión SMTP...');
    await transporter.verify();
    console.log('✅ Conexión SMTP exitosa!');
    return true;
  } catch (error) {
    console.error('❌ Error de conexión SMTP:', error.message);
    return false;
  }
}

async function sendTestEmail() {
  try {
    console.log('📧 Enviando email de prueba...');
    
    const mailOptions = {
      from: process.env.MAILER_USER,
      to: 'mailercolibri@gmail.com', // Envía a ti mismo para probar
      subject: 'Prueba de Email - Vázquez Quiles Accounting',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">✅ Email funcionando correctamente!</h2>
          <p>Este es un email de prueba desde tu sistema de Vázquez Quiles Accounting.</p>
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            <p><strong>Sistema:</strong> Nodemailer + Gmail SMTP</p>
            <p><strong>Estado:</strong> ✅ Funcionando correctamente</p>
          </div>
          <p>¡Tu sistema de email está listo para usar!</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado exitosamente!');
    console.log('Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 PRUEBA SIMPLE DE EMAIL\n');
  
  const connectionOk = await testConnection();
  if (!connectionOk) {
    console.log('\n❌ Prueba terminada: No se pudo establecer conexión SMTP');
    return;
  }
  
  const emailOk = await sendTestEmail();
  
  console.log('\n' + '='.repeat(50));
  if (emailOk) {
    console.log('🎉 ¡TODO FUNCIONA CORRECTAMENTE!');
    console.log('Tu sistema de email está listo para usar.');
  } else {
    console.log('❌ Hay problemas con el envío de email.');
  }
}

main().catch(console.error);