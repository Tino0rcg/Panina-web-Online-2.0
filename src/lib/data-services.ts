import { 
  Cloud, 
  Terminal, 
  ShieldCheck, 
  Code2, 
  BarChart3, 
  Settings2, 
  BrainCircuit, 
  Rocket,
  Shield,
  Monitor,
  LucideIcon
} from "lucide-react";

export interface ServicePlan {
  name: string;
  subtitle: string;
  features: string[];
  summary: string;
  highlight?: boolean;
}

export interface ServiceData {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glow: string;
  image: string;
  features: string[];
  concludingText?: string;
  cardDescription?: string;
  featuresTitle?: string;
  featuresSubtitle?: string;
  nameHighlight?: string;
  featuresTitleHighlight?: string;
  plans?: ServicePlan[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "soporte-ti-empresas-chile",
    name: "Soporte TI para Empresas y Mantenimiento Preventivo",
    description: "Garantizamos la continuidad operativa de su negocio en Chile con un servicio integral de Soporte TI y mantenimiento preventivo. Diseñamos soluciones de outsourcing TI para anticipar fallas, asegurar la estabilidad de su infraestructura y proteger sus activos críticos.",
    cardDescription: "Soporte TI integral y mantenimiento preventivo diseñado para asegurar la continuidad operativa de empresas en Chile.",
    icon: ShieldCheck,
    color: "text-accent",
    glow: "shadow-[0_0_20px_-10px_rgba(45,183,193,0.5)]",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Soporte.png",
    features: [
      "Monitoreo proactivo 24/7: Detección temprana de incidentes para evitar interrupciones.",
      "Mantenimiento preventivo programado: Maximice el rendimiento y vida útil de sus equipos.",
      "Soporte técnico remoto y en terreno: Atención rápida ante incidencias críticas en Santiago y regiones.",
      "Gestión de seguridad informática: Protección de datos y control de accesos continuo.",
      "Administración de redes y conectividad: Estabilidad y alta disponibilidad garantizada.",
      "Gestión de servicios cloud: Administración de nubes, respaldos y continuidad operacional.",
      "Actualización y gestión de parches: Sistemas siempre seguros y alineados a buenas prácticas.",
      "Reportes de gestión y desempeño: Indicadores claros sobre el estado de su plataforma TI.",
      "Asesoría tecnológica continua: Acompañamiento estratégico para el crecimiento de su empresa."
    ],
    concludingText: "Asegure su operación con un soporte TI profesional que elimina riesgos y reduce costos operativos.\n\n✔ +30% eficiencia operativa\n✔ Eliminación de caídas críticas\n✔ Soporte experto 24/7",
    plans: [
      {
        name: "Plan Proactivo",
        subtitle: "Para empresas en crecimiento",
        features: [
          "Soporte remoto ilimitado",
          "Mantenimiento preventivo mensual",
          "Gestión de seguridad básica",
          "Monitoreo 8x5"
        ],
        summary: "Estabilidad para su negocio"
      },
      {
        name: "Plan Business Critical",
        subtitle: "Continuidad Total",
        features: [
          "Soporte remoto + On-site",
          "Monitoreo proactivo 24/7",
          "Administración avanzada de red",
          "Gestión de respaldos y Cloud",
          "Reportes ejecutivos mensuales"
        ],
        summary: "Nuestra solución más recomendada",
        highlight: true
      },
      {
        name: "Plan Enterprise",
        subtitle: "Outsourcing Total TI",
        features: [
          "SLA garantizado por contrato",
          "Ingeniero residente opcional",
          "Ciberseguridad avanzada",
          "Asesoría estratégica de TI (vCTO)",
          "Gestión completa de infraestructura"
        ],
        summary: "Control absoluto de su tecnología"
      }
    ]
  },
  {
    slug: "automatizacion-procesos-empresas",
    name: "Automatización de Procesos y Transformación Digital",
    nameHighlight: "y Transformación Digital",
    description: "Ayudamos a empresas en Chile a eliminar tareas manuales ineficientes mediante la automatización de procesos. Implementamos soluciones TI a medida que modernizan su gestión tecnológica y aceleran su productividad.",
    cardDescription: "Optimización de procesos y automatización inteligente para modernizar la gestión tecnológica de su empresa.",
    icon: Rocket,
    color: "text-accent",
    glow: "shadow-[0_0_20px_-10px_rgba(45,183,193,0.5)]",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    featuresTitle: "Servicios de Automatización",
    featuresTitleHighlight: "de Automatización",
    featuresSubtitle: "Soluciones diseñadas para escalar su operación sin aumentar costos fijos.",
    features: [
      "Análisis de cuellos de botella: Detectamos procesos manuales que frenan su crecimiento.",
      "Diseño de flujos digitales: Creación de arquitecturas de automatización eficientes.",
      "Integración de sistemas: Conectamos sus herramientas actuales para que hablen entre sí.",
      "Desarrollo de bots y scripts: Automatización de tareas repetitivas y carga de datos.",
      "Dashboards de control: Visibilidad en tiempo real de sus procesos automatizados.",
      "Optimización de costos: Reducción drástica de errores humanos y tiempos de ejecución."
    ]
  },
  {
    slug: "infraestructura-redes-telecomunicaciones",
    name: "Ingeniería de Redes e Infraestructura Crítica",
    description: "Diseño y despliegue de infraestructura TI robusta para empresas. Desde cableado estructurado certificado hasta ciberseguridad en capa de red, garantizamos que su conectividad soporte las demandas de una operación moderna.",
    cardDescription: "Ingeniería de redes, conectividad de alta velocidad e infraestructura crítica para operaciones empresariales.",
    icon: Settings2,
    color: "text-slate-400",
    glow: "shadow-[0_0_20px_-10px_rgba(148,163,184,0.5)]",
    image: "/network-engineering.png",
    nameHighlight: "Redes e Infraestructura Crítica",
    featuresTitle: "Servicios de Ingeniería",
    featuresTitleHighlight: "de Ingeniería",
    featuresSubtitle: "Infraestructura diseñada para la alta disponibilidad.",
    features: [
      "Diseño de Redes LAN/WAN: Arquitecturas escalables y resilientes para alta demanda.",
      "Fibra Óptica y Cableado Certificado: Instalación profesional con certificación de velocidad.",
      "Ciberseguridad Perimetral (Firewalls): Protección avanzada contra amenazas externas.",
      "Infraestructura para Centros de Datos: Diseño de racks, energía y climatización.",
      "Comunicaciones Unificadas (VoIP): Telefonía IP de alta calidad integrada a su red.",
      "Seguridad Electrónica IP: Videovigilancia y control de acceso centralizado.",
      "Control de Acceso Biométrico: Sistemas de seguridad de alta precisión mediante huella dactilar y reconocimiento facial/iris, con registros de auditoría centralizados.",
      "Proyectos y Estudios Eléctricos: Ingeniería de sistemas de potencia, tableros eléctricos, certificación SEC y auditorías de eficiencia energética corporativa."
    ],
    concludingText: "Construimos la base tecnológica que permite a su empresa crecer sin límites."
  },
  {
    slug: "cloud-computing-chile",
    name: "Cloud Computing y Migración a la Nube",
    description: "Lleve su empresa al siguiente nivel con arquitecturas Cloud en AWS, Azure o Google Cloud. Nos especializamos en migración segura y optimización de costos en la nube para empresas en Chile.",
    icon: Cloud,
    color: "text-accent",
    glow: "shadow-[0_0_20px_-10px_rgba(45,183,193,0.5)]",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    features: [
      "Migración de Infraestructura: Traslado seguro de servidores físicos a entornos AWS, Azure o Google Cloud con tiempo de inactividad mínimo.",
      "Arquitecturas Híbridas: Conexión eficiente entre sus servidores locales y la nube para máxima resiliencia y flexibilidad.",
      "Optimización de Costos (FinOps): Auditoría y ajuste de recursos en la nube para reducir gastos innecesarios y maximizar el rendimiento.",
      "Respaldo y Recuperación (DRP): Planes de continuidad de negocio con respaldos automatizados y recuperación ante desastres en la nube."
    ]
  },
  {
    slug: "ciberseguridad-empresas-chile",
    name: "Ciberseguridad y Protección de Activos Digitales",
    description: "Proteja su empresa contra ransomware y ataques dirigidos. Realizamos auditorías de vulnerabilidades y protegemos proactivamente su información crítica bajo estándares internacionales.",
    icon: ShieldCheck,
    color: "text-red-400",
    glow: "shadow-[0_0_20px_-10px_rgba(248,113,113,0.5)]",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    features: [
      "Auditorías de Pentesting: Identificación de vulnerabilidades mediante simulaciones de ataques controlados y ethical hacking.",
      "Protección de Endpoints: Blindaje de computadores y servidores contra ransomware y malware de última generación.",
      "Arquitecturas Zero Trust: Implementación de políticas de seguridad donde nadie es confiable sin verificación previa.",
      "Respuesta ante Incidentes: Equipo de respuesta rápida para contención de ataques y análisis forense digital."
    ]
  },
  {
    slug: "big-data-analytics",
    name: "Big Data & Business Intelligence",
    description: "Transforme sus datos en decisiones estratégicas. Dashboards en tiempo real y análisis predictivo para optimizar su rentabilidad.",
    icon: BarChart3,
    color: "text-primary",
    glow: "shadow-[0_0_20px_-10px_rgba(17,122,151,0.5)]",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    features: [
      "Centralización de Datos: Consolidación de múltiples fuentes de información en un solo repositorio estructurado.",
      "Dashboards Ejecutivos: Creación de tableros de control en Power BI o herramientas similares para decisiones estratégicas.",
      "Análisis de Tendencias: Identificación de patrones de comportamiento para anticipar movimientos del mercado.",
      "Calidad de Datos: Procesos de limpieza y estructuración para asegurar que la información sea confiable y útil."
    ]
  },
  {
    slug: "inteligencia-artificial-negocios",
    name: "Inteligencia Artificial para Negocios",
    description: "Automatización cognitiva y agentes inteligentes para optimizar flujos de trabajo corporativos.",
    icon: BrainCircuit,
    color: "text-accent",
    glow: "shadow-[0_0_20px_-10px_rgba(45,183,193,0.5)]",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    features: [
      "Agentes Inteligentes: Implementación de Chatbots avanzados con IA Generativa para atención al cliente y soporte interno.",
      "Procesamiento Automático: Automatización de lectura de documentos y facturas mediante OCR inteligente.",
      "Optimización de Stock: Modelos predictivos para la gestión de inventarios y cadena de suministro.",
      "Integración de LLMs: Conexión de modelos de lenguaje (como GPT) en sus flujos de trabajo operativos."
    ]
  },
  {
    slug: "partner-softland-soporte",
    name: "Partner Tecnológico Softland ERP",
    description: "Especialistas en implementación, soporte y optimización de Softland ERP en Chile. Aseguramos que su ERP sea el motor de su empresa, no un problema.",
    cardDescription: "Soporte experto y optimización de Softland ERP para potenciar la eficiencia de su negocio.",
    icon: Settings2,
    color: "text-blue-500",
    glow: "shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    features: [
      "Soporte Especializado: Resolución de incidencias técnicas y funcionales para todos los módulos de Softland ERP.",
      "Actualizaciones de Versión: Migración segura de bases de datos y despliegue de nuevas funcionalidades del sistema.",
      "Optimización Operativa: Ajuste de flujos contables y de remuneraciones para una gestión más rápida y sin errores.",
      "Capacitación Continua: Entrenamiento a usuarios para maximizar el uso de las herramientas del ERP."
    ]
  },
  {
    slug: "integracion-erp-apis",
    name: "Integración de Sistemas ERP y APIs",
    nameHighlight: "Sistemas ERP y APIs",
    description: "Conectamos sus sistemas core (Softland, SAP, Defontana) con e-commerce, CRM y software a medida. Logre una automatización total eliminando la doble digitación de datos.",
    cardDescription: "Integración de sistemas y automatización de flujos de datos entre ERPs y aplicaciones externas.",
    icon: Code2,
    color: "text-primary",
    glow: "shadow-[0_0_20px_-10px_rgba(17,122,151,0.5)]",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    featuresTitle: "Casos de ",
    featuresTitleHighlight: "Uso",
    featuresSubtitle: "Sincronización total de su ecosistema digital.",
    features: [
      "Integración E-commerce ↔ ERP (Stock y Pedidos).",
      "Conectividad con pasarelas de pago y bancos.",
      "Automatización de procesos para corredoras de seguros.",
      "Sincronización de CRM con facturación electrónica.",
      "Desarrollo de APIs a medida para interoperabilidad."
    ],
    concludingText: "Acelere su empresa eliminando procesos manuales mediante integraciones robustas."
  },
  {
    slug: "oficina-virtual-inteligente",
    name: "Sala Virtual e Inteligente",
    description: "Transforme sus oficinas y salas de reunión físicas con tecnología avanzada. Nuestro servicio de Sala Virtual e Inteligente integra sistemas de comunicación de alta calidad, control de acceso y sensores IoT para garantizar seguridad, colaboración y confort.",
    cardDescription: "Sistemas de videoconferencia, control de acceso biométrico y sensores IoT para espacios de trabajo modernos e inteligentes.",
    icon: Monitor,
    color: "text-indigo-400",
    glow: "shadow-[0_0_20px_-10px_rgba(129,140,248,0.5)]",
    image: "/smart-office-video-conference.png",
    featuresTitle: "Características Principales",
    featuresTitleHighlight: "Principales",
    features: [
      "Sistema de Videollamadas Avanzado: Salas de reuniones equipadas con pantallas TV para proyección de imagen, parlantes de alta fidelidad, micrófonos y cámaras de calidad profesional.",
      "Control de Acceso Privado: Seguridad para ingreso a oficinas mediante sistemas biométricos (como reconocimiento de huella dactilar), garantizando un acceso controlado y exclusivo.",
      "Sensores Inteligentes IoT: Instalación de sensores detectores de incendios (humo/calor) y medidores de humedad para el monitoreo preventivo de las instalaciones corporativas.",
      "Alertas y Mensajería de Urgencia: Envíos automatizados de mensajería (SMS, correo o integraciones) que identifican y priorizan el nivel de urgencia o gravedad del evento detectado.",
      "Integración de Plataformas: Centralización de las alertas y sistemas de videovigilancia para facilitar la reacción rápida de la administración y el área TI."
    ],
    concludingText: "Asegure la colaboración efectiva y la protección de su área de trabajo con soluciones inteligentes integradas en tiempo real."
  }
];
