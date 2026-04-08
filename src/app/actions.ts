"use server";

import 'dotenv/config';
import { Resend } from 'resend';
import { z } from 'zod';
import { Buffer } from 'buffer';



const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  service: z.string().min(1, "Seleccione un servicio"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export async function sendContactEmail(prevState: any, formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  console.log("CONTACT ACTION: API Key status:", apiKey ? "Cargada" : "NO ENCONTRADA");
  
  if (!apiKey || apiKey.includes('your_api_key')) {
    return { error: "Configuración de correo incompleta. (API Key faltante en .env)" };
  }

  const resend = new Resend(apiKey);

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    service: formData.get('service'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return { 
      error: "Por favor complete todos los campos correctamente.",
      details: validatedFields.error.flatten().fieldErrors 
    };
  }

  const { name, email, service, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ONLINE System Web <onboarding@resend.dev>',
      to: [process.env.CONTACT_RECEIVER_EMAIL || 'contacto@onlinesystem.cl'],
      subject: `Solicitud de Consultoría: ${service}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 24px; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Nuevo Requerimiento Estratégico</h1>
          </div>
          <div style="padding: 32px; color: #334155;">
            <p style="margin-bottom: 24px; font-size: 16px;">Se ha recibido una nueva solicitud de consultoria desde el sitio web.</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 12px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 12px 0;"><strong>Servicio:</strong> ${service}</p>
            </div>

            <div style="border-left: 4px solid #117a97; padding-left: 16px; margin-bottom: 24px;">
              <p style="margin: 0; font-weight: bold; margin-bottom: 8px;">Mensaje Técnico:</p>
              <p style="margin: 0; line-height: 1.6;">${message}</p>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">Enviado desde el formulario de contacto de ONLINE System</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { error: "Hubo un problema de conexión con el servicio de correo." };
    }

    return { success: true, message: "Su requerimiento ha sido enviado con éxito." };
  } catch (err) {
    console.error('Submission error:', err);
    return { error: "Error inesperado al procesar la solicitud." };
  }
}
const bookingSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  date: z.string().min(1, "Seleccione una fecha"),
  time: z.string().min(1, "Seleccione una hora"),
  isoDate: z.string().min(1, "Fecha base inválida"),
});

export async function scheduleBooking(prevState: any, formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  console.log("BOOKING ACTION: API Key status:", apiKey ? "Cargada" : "NO ENCONTRADA");

  if (!apiKey || apiKey.includes('your_api_key')) {
    return { error: "Configuración de correo incompleta. (API Key faltante en .env)" };
  }

  const resend = new Resend(apiKey);
  const rawFields = {
    name: formData.get('name'),
    email: formData.get('email'),
    date: formData.get('date'),
    time: formData.get('time'),
    isoDate: formData.get('isoDate'),
  };

  const validatedFields = bookingSchema.safeParse(rawFields);

  if (!validatedFields.success) {
    console.error('Validation error:', validatedFields.error.flatten());
    return { error: "Por favor complete todos los campos del formulario correctamente." };
  }

  const { name, email, date, time, isoDate } = validatedFields.data;

  try {
    // Generar archivo ICS para el calendario
    const [startHour, startMinutes] = time.split(':').map(Number);
    
    // Usar la fecha ISO preservando la zona horaria del servidor o UTC
    const startTime = new Date(isoDate);
    startTime.setHours(startHour, startMinutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    const formatDateICS = (d: Date, isUTC = false) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const time = d.getFullYear() +
        pad(d.getMonth() + 1) +
        pad(d.getDate()) +
        'T' +
        pad(d.getHours()) +
        pad(d.getMinutes()) +
        pad(d.getSeconds());
      return isUTC ? time + 'Z' : time;
    };

    const escapeICS = (str: string) => 
      str.replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ONLINE System//Booking//ES',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@onlinesystem.cl`,
      `DTSTAMP:${formatDateICS(new Date(), true)}`,
      `DTSTART:${formatDateICS(startTime)}`,
      `DTEND:${formatDateICS(endTime)}`,
      `SUMMARY:${escapeICS(`Cita: ${name}`)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    console.log("ICS DEBUG CONTENT:", icsContent);

    const attachment = {
      filename: 'reserva.ics',
      content: Buffer.from(icsContent).toString('base64'),
      content_type: 'text/calendar',
    };

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'contacto@onlinesystem.cl';

    // 1. Correo para ONLINE System (Admin)
    const adminEmail = await resend.emails.send({
      from: 'ONLINE System Agenda <onboarding@resend.dev>',
      to: [recipient],
      subject: `Nueva Reserva: ${name} (${date} - ${time})`,
      attachments: [attachment],
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 24px; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">Nueva Solicitud de Consultoría</h1>
          </div>
          <div style="padding: 32px; color: #334155;">
            <p>Se ha recibido una nueva solicitud de reunión. Hemos adjuntado el archivo de calendario para tu Webmail.</p>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>Cliente:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 15px 0 10px 0; padding-top: 15px; border-top: 1px solid #e2e8f0;"><strong>Fecha sugerida:</strong> ${date}</p>
              <p style="margin: 0;"><strong>Hora sugerida:</strong> ${time}</p>
            </div>
            <p style="margin-top: 20px; font-size: 13px; color: #64748b;">* Al abrir el archivo adjunto en tu Webmail, podrás agendarlo automáticamente.</p>
          </div>
        </div>
      `,
    });

    if (adminEmail.error) {
      console.error('Error sending admin email:', adminEmail.error);
    }

    // 2. Correo para el Cliente (Confirmación de recepción)
    const clientEmail = await resend.emails.send({
      from: 'ONLINE System <onboarding@resend.dev>',
      to: [email],
      subject: 'Solicitud de Consultoría Recibida - ONLINE System',
      attachments: [attachment],
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #117a97; padding: 24px; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">¡Solicitud Recibida!</h1>
          </div>
          <div style="padding: 32px; color: #334155;">
            <p>Hola <strong>${name}</strong>,</p>
            <p>Hemos recibido tu solicitud para agendar una consultoría técnica. Hemos adjuntado una invitación provisional para tu calendario.</p>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Fecha:</strong> ${date}</p>
              <p style="margin: 0;"><strong>Hora:</strong> ${time}</p>
            </div>
            <p>Un ingeniero de nuestro equipo confirmará la disponibilidad final en breve. Por favor, asegúrese de guardar el archivo adjunto en su calendario.</p>
            <p style="margin-top: 30px;">Atentamente,<br /><strong>Equipo de Ingeniería ONLINE System</strong></p>
          </div>
        </div>
      `,
    });

    return { success: true, message: "Reserva enviada con éxito." };
  } catch (error) {
    console.error('CRITICAL Booking error:', error);
    return { error: "Hubo un problema al procesar su reserva. Intentelo más tarde." };
  }
}
