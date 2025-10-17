import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import path from 'path';
import fs from 'fs';

const SITE_URL = 'https://vazquezquilesaccounting.com';

// Resolve absolute path to logo in the public folder
const LOGO_PATH = path.join(process.cwd(), 'public', 'logo.png');
if (!fs.existsSync(LOGO_PATH)) {
  // warn at startup so developer can fix the path
  console.warn('[email] logo not found at', LOGO_PATH);
}

// Email configuration - using environment variables for security
const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_USER || 'mailercolibri@gmail.com',
    pass: process.env.MAILER_PASS || '' // Use environment variable for password
  }
};

// Create transporter
export const transporter = nodemailer.createTransporter(EMAIL_CONFIG);

// Email addresses
export const BUSINESS_EMAILS = [
  'anthonyaguilarparrales2005@gmail.com',
  'mailercolibri@gmail.com'
];

// Email templates
export const generateUserConfirmationEmail = (data: {
  nombre: string;
  email: string;
  telefono?: string;
  servicio?: string;
  mensaje: string;
}): SendMailOptions => {
  return {
    from: 'mailercolibri@gmail.com',
    to: data.email,
    subject: 'Confirmación - Mensaje recibido | Vázquez Quiles Accounting',
    // Attach the logo so clients like Gmail can show it inline via cid
    attachments: [
      {
        filename: 'logo.png',
        path: LOGO_PATH,
        cid: 'logo_cid',
        contentType: 'image/png',
        contentDisposition: 'inline' as const
      }
    ],
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; width:100%; max-width:600px; margin:0 auto;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="background:linear-gradient(90deg,#0ea5e9,#2563eb); padding:20px; text-align:center; border-top-left-radius:8px; border-top-right-radius:8px;">
              <a href="${SITE_URL}" target="_blank" style="display:inline-block; text-decoration:none;">
                <img src="cid:logo_cid" alt="Vázquez Quiles Accounting" width="120" height="120" style="max-width:120px; height:auto; display:block; margin:0 auto 8px auto;" />
              </a>
              <h1 style="color:#ffffff; font-size:20px; margin:0;">Vázquez Quiles Accounting</h1>
              <p style="color:rgba(255,255,255,0.9); margin:6px 0 0 0; font-size:13px;">Servicios Profesionales de Contabilidad</p>
            </td>
          </tr>

          <tr>
            <td style="background:#f8fafc; padding:22px; border:1px solid #e6eef9;">
              <h2 style="color:#0f172a; margin:0 0 12px 0; font-size:18px;">¡Gracias por contactarnos, ${data.nombre}!</h2>
              <p style="color:#334155; font-size:14px; line-height:1.5; margin:0 0 12px 0;">Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible. Nuestro equipo revisará tu consulta y te responderemos en un plazo máximo de 24 horas.</p>

              <div style="background:#ffffff; padding:16px; border-radius:6px; border-left:4px solid #2563eb; margin:14px 0;">
                <strong style="display:block; color:#0f172a; margin-bottom:8px;">Resumen de tu consulta</strong>
                <div style="font-size:14px; color:#334155; line-height:1.5;">
                  <div><strong>Servicio:</strong> ${data.servicio || 'No especificado'}</div>
                  <div><strong>Teléfono:</strong> ${data.telefono || 'No especificado'}</div>
                  <div style="margin-top:8px;"><strong>Mensaje:</strong></div>
                  <div style="background:#eef2ff; padding:12px; border-radius:4px; margin-top:6px; color:#0f172a;">${data.mensaje}</div>
                </div>
              </div>

              <p style="margin:0 0 12px 0; color:#334155; font-size:13px;">Si tienes alguna pregunta urgente, puedes llamarnos directamente o responder a este correo.</p>

              <div style="text-align:center; margin-top:18px;">
                <p style="color:#64748b; font-size:12px; margin:0 0 8px 0;"><strong>Enviado por:</strong> Vázquez Quiles Accounting</p>
                <p style="margin:0; font-size:12px; color:#94a3b8;">Sistema de contacto desarrollado y soportado por <a href="https://colibrisearcher.com/" target="_blank" style="color:#2563eb; text-decoration:none; font-weight:600;">ColibriSearcher</a></p>
              </div>

              <p style="color:#94a3b8; font-size:11px; margin:14px 0 0 0; text-align:center;">Este es un mensaje automático. Por favor no respondas a este correo.</p>
            </td>
          </tr>
        </table>
      </div>
    `
  };
};

export const generateBusinessNotificationEmail = (data: {
  nombre: string;
  email: string;
  telefono?: string;
  servicio?: string;
  mensaje: string;
}): SendMailOptions => {
  return {
    from: 'mailercolibri@gmail.com',
    to: BUSINESS_EMAILS,
    subject: `Nueva consulta de contacto - ${data.nombre}`,
    // Attach logo for inline display in email clients
    attachments: [
      {
        filename: 'logo.png',
        path: LOGO_PATH,
        cid: 'logo_cid',
        contentType: 'image/png',
        contentDisposition: 'inline' as const
      }
    ],
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; width:100%; max-width:600px; margin:0 auto;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="background:linear-gradient(90deg,#0ea5e9,#2563eb); padding:18px; text-align:center; border-top-left-radius:8px; border-top-right-radius:8px;">
              <a href="${SITE_URL}" target="_blank" style="display:inline-block; text-decoration:none;">
                <img src="cid:logo_cid" alt="Vázquez Quiles Accounting" width="110" height="110" style="max-width:110px; height:auto; display:block; margin:0 auto 8px auto;" />
              </a>
              <h1 style="color:#ffffff; font-size:18px; margin:0;">Nueva Consulta de Contacto</h1>
              <p style="color:rgba(255,255,255,0.95); margin:6px 0 0 0; font-size:12px;">Enviado desde: Vázquez Quiles Accounting</p>
            </td>
          </tr>

          <tr>
            <td style="background:#f8fafc; padding:18px; border:1px solid #e6eef9;">
              <h2 style="color:#0f172a; margin:0 0 12px 0; font-size:16px;">Detalles del Cliente</h2>

              <div style="background:#ffffff; padding:14px; border-radius:6px; margin-bottom:12px; border:1px solid #e6eef9;">
                <div style="font-size:14px; color:#0f172a; margin-bottom:8px;"><strong>Nombre:</strong> ${data.nombre}</div>
                <div style="font-size:14px; color:#0f172a; margin-bottom:8px;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#2563eb; text-decoration:none;">${data.email}</a></div>
                <div style="font-size:14px; color:#0f172a; margin-bottom:8px;"><strong>Teléfono:</strong> ${data.telefono || 'No especificado'}</div>
                <div style="font-size:14px; color:#0f172a;"><strong>Servicio:</strong> ${data.servicio || 'No especificado'}</div>
              </div>

              <div style="background:#ffffff; padding:14px; border-radius:6px; border:1px solid #e6eef9;">
                <h3 style="margin:0 0 8px 0; font-size:14px; color:#0f172a;">Mensaje</h3>
                <div style="background:#eef2ff; padding:12px; border-radius:4px; color:#0f172a;">${data.mensaje}</div>
              </div>

              <div style="background:#e6f0ff; padding:12px; border-radius:6px; margin-top:12px; text-align:center;">
                <p style="margin:0; font-size:13px; color:#0f172a;"><strong>Recordatorio:</strong> Responder en un plazo máximo de 24 horas.</p>
              </div>

              <p style="color:#64748b; font-size:11px; margin:12px 0 0 0; text-align:center;">Mensaje enviado automáticamente desde el formulario de contacto</p>

              <div style="border-top:1px solid #eef4ff; padding-top:12px; margin-top:12px; text-align:center;">
                <p style="color:#94a3b8; font-size:11px; margin:0 0 6px 0;">Sistema de contacto desarrollado y soportado por</p>
                <a href="https://colibrisearcher.com/" target="_blank" style="color:#2563eb; text-decoration:none; font-weight:600;">ColibriSearcher</a>
                <p style="color:#94a3b8; font-size:11px; margin:8px 0 0 0;">${new Date().toLocaleDateString('es-PR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `
  };
};