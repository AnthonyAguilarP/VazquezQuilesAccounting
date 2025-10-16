import { transporter, generateUserConfirmationEmail, generateBusinessNotificationEmail } from '../../utils/email.js';

// Enable server-side rendering for this API endpoint
export const prerender = false;

interface ContactFormData {
  nombre: string;
  email: string;
  telefono?: string;
  servicio?: string;
  mensaje: string;
}

export async function POST({ request }: { request: any }) {
  try {
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.nombre || !data.email || !data.mensaje) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Faltan campos requeridos: nombre, email y mensaje son obligatorios' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Formato de email inválido' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing contact form submission:', {
      nombre: data.nombre,
      email: data.email,
      servicio: data.servicio,
      timestamp: new Date().toISOString()
    });

    try {
      // Send confirmation email to user
      const userEmail = generateUserConfirmationEmail(data);
      await transporter.sendMail(userEmail);
      console.log('Confirmation email sent to user:', data.email);

      // Send notification email to business
      const businessEmail = generateBusinessNotificationEmail(data);
      await transporter.sendMail(businessEmail);
      console.log('Notification email sent to business');

      return new Response(JSON.stringify({ 
        success: true,
        message: 'Mensaje enviado exitosamente. Te hemos enviado una confirmación por email.' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      
      // Still return success to user but log the email error
      // This prevents user experience issues if email fails
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Mensaje recibido. Nos pondremos en contacto contigo pronto.',
        emailWarning: 'La confirmación por email pudo haber fallado, pero tu mensaje fue recibido.' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (err) {
    console.error('Error in contact endpoint:', err);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error interno del servidor. Por favor intenta más tarde.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
