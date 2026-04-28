import { NextResponse } from 'next/server';
import { generateDailyBlogFlow } from '@/ai/flows/generateDailyBlog';

export const dynamic = 'force-dynamic'; // Evita el cacheo de este endpoint
export const maxDuration = 60; // Permite hasta 60 segundos de ejecución en Vercel para la IA

export async function GET(request: Request) {
  try {
    // Basic security check (optional, but recommended for cron jobs)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Ejecuta el flujo de inteligencia artificial (Genkit)
    const result = await generateDailyBlogFlow({ trigger: "manual-cron" });

    if (result.success) {
      return NextResponse.json({ 
        message: "¡Blog generado y correo enviado con éxito!", 
        slug: result.slug 
      }, { status: 200 });
    } else {
      return NextResponse.json({ 
        error: "Fallo en la generación", 
        details: result.message 
      }, { status: 500 });
    }
    
  } catch (error: any) {
    console.error('Error in cron job:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
