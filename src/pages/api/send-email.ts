import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../utils/email.js';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validar que el método sea POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Método no permitido'
      }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Obtener los datos del formulario
    const data = await request.json();

    // Validar campos requeridos
    if (!data.nombre || !data.email || !data.mensaje) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Los campos nombre, email y mensaje son requeridos'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Formato de email inválido'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Enviar el email
    const result = await sendContactEmail({
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      servicio: data.servicio,
      mensaje: data.mensaje
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error en API send-email:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Error interno del servidor al enviar el email',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};