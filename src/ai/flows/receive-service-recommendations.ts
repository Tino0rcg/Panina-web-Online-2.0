'use server';
/**
 * @fileOverview A Genkit flow that provides tailored consulting service recommendations based on client needs.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReceiveServiceRecommendationsInputSchema = z.object({
  clientNeeds: z
    .string()
    .describe(
      'Una descripción detallada de los desafíos comerciales, objetivos y necesidades técnicas del cliente.'
    ),
});
export type ReceiveServiceRecommendationsInput = z.infer<
  typeof ReceiveServiceRecommendationsInputSchema
>;

const RecommendedServiceSchema = z.object({
  name: z.string().describe('El nombre del servicio recomendado por ONLINE System.'),
  reason: z
    .string()
    .describe('Una breve explicación de por qué se recomienda este servicio en función de la entrada del cliente.'),
});

const ReceiveServiceRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendedServiceSchema)
    .describe('Una lista de recomendaciones de servicios personalizados para el cliente.'),
});
export type ReceiveServiceRecommendationsOutput = z.infer<
  typeof ReceiveServiceRecommendationsOutputSchema
>;

const serviceMatcherPrompt = ai.definePrompt({
  name: 'serviceMatcherPrompt',
  input: {schema: ReceiveServiceRecommendationsInputSchema},
  output: {schema: ReceiveServiceRecommendationsOutputSchema},
  prompt: `Eres un consultor experto de ONLINE System, una firma chilena de consultoría tecnológica con más de 20 años de experiencia. Tu objetivo es analizar los desafíos y necesidades comerciales de un cliente y recomendar los servicios más adecuados de nuestras 9 líneas de negocio.

Aquí están los servicios que ONLINE System proporciona:
- **Transformación Digital**: Evaluación tecnológica, planificación estratégica y optimización de procesos (incluyendo soluciones AppSheet para digitalización rápida).
- **Desarrollo de Software**: Creación de software a medida, integraciones de sistemas complejos (ERP, CRM, WMS) y soluciones basadas en RFID.
- **Cloud Computing**: Migración experta a AWS, Azure y Google Cloud, optimización de infraestructura de nube y seguridad avanzada en la nube.
- **Ciberseguridad**: Análisis detallado de vulnerabilidades, auditorías de seguridad, políticas de cumplimiento y protección de endpoints y correo.
- **Big Data & Analytics**: Implementación de Business Intelligence (BI), creación de dashboards en tiempo real y modelos de análisis predictivo.
- **Inteligencia Artificial**: Desarrollo de chatbots inteligentes, procesos de automatización robótica y modelos predictivos personalizados.
- **Infraestructura y Redes**: Diseño y mantenimiento de redes LAN/WAN, cableado estructurado, gestión de datacenters y certificación.
- **Gestión de Proyectos TI**: Gestión integral de proyectos tecnológicos utilizando metodologías ITIL y evaluación de impacto.
- **Soporte Técnico 24/7**: Mantenimiento preventivo, soporte remoto y presencial con gestión proactiva de servicios de ingeniería, redes y telecomunicaciones.

Analiza las necesidades del cliente descritas a continuación y proporciona una lista de 1 a 3 recomendaciones de servicios relevantes. Para cada recomendación, proporciona el nombre exacto del servicio y una razón concisa que explique por qué es adecuado para las necesidades expresadas del cliente, alineándote con la visión de ONLINE System de modernizar empresas completas.

Desafíos y necesidades comerciales del cliente:
{{{clientNeeds}}}`,
});

const receiveServiceRecommendationsFlow = ai.defineFlow(
  {
    name: 'receiveServiceRecommendationsFlow',
    inputSchema: ReceiveServiceRecommendationsInputSchema,
    outputSchema: ReceiveServiceRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await serviceMatcherPrompt(input);
    if (!output) {
      throw new Error('No se pudo obtener una recomendación de la IA. Verifique la configuración de la clave de API (GOOGLE_GENAI_API_KEY).');
    }
    return output;
  }
);

export async function receiveServiceRecommendations(
  input: ReceiveServiceRecommendationsInput
): Promise<ReceiveServiceRecommendationsOutput> {
  return receiveServiceRecommendationsFlow(input);
}
