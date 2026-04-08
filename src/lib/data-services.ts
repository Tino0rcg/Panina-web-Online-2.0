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
    slug: "soporte-especializado",
    name: "Contrato y Soporte de Mantenimiento Preventivo",
    description: "Garantiza la continuidad operativa de tu empresa con un servicio integral de soporte TI y mantenimiento preventivo, diseñado para anticipar fallas, optimizar el rendimiento de tus sistemas y asegurar la estabilidad de tu infraestructura tecnológica.",
    cardDescription: "Soporte TI integral y mantenimiento proactivo para garantizar la continuidad operativa y estabilidad de su infraestructura tecnológica.",
    icon: ShieldCheck,
    color: "text-accent",
    glow: "shadow-[0_0_20px_-10px_rgba(45,183,193,0.5)]",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Soporte.png",
    features: [
      "Monitoreo proactivo 24/7: Detección temprana de incidentes para evitar interrupciones en tu operación.",
      "Mantenimiento preventivo programado: Revisión periódica de equipos, servidores y redes para maximizar su rendimiento y vida útil.",
      "Soporte técnico remoto y en terreno: Atención rápida y eficiente ante incidencias críticas y requerimientos diarios.",
      "Gestión de seguridad informática: Protección de datos, control de accesos y actualización continua contra amenazas.",
      "Administración de redes y conectividad: Optimización de la infraestructura para asegurar estabilidad y alta disponibilidad.",
      "Gestión de servicios cloud: Administración de plataformas en la nube, respaldos y continuidad operacional.",
      "Actualización y gestión de parches: Sistemas siempre actualizados, seguros y alineados a buenas prácticas.",
      "Reportes de gestión y desempeño: Informes periódicos con indicadores, incidencias y mejoras implementadas.",
      "Asesoría tecnológica continua: Acompañamiento estratégico para la evolución y optimización de tu entorno TI."
    ],
    concludingText: "Evita caídas, reduce riesgos y asegura tu operación con un soporte TI profesional y mantenimiento preventivo inteligente.",
    plans: [
      {
        name: "Plan Básico",
        subtitle: "Ideal para pequeñas empresas",
        features: [
          "Soporte remoto (horario hábil)",
          "Mantenimiento preventivo mensual",
          "Gestión básica de usuarios",
          "Monitoreo limitado"
        ],
        summary: "Para operaciones simples"
      },
      {
        name: "Plan Profesional",
        subtitle: "Ideal para empresas en crecimiento",
        features: [
          "Soporte remoto + en terreno",
          "Monitoreo proactivo",
          "Mantenimiento preventivo programado",
          "Administración de red",
          "Seguridad y actualizaciones",
          "Reportes mensuales"
        ],
        summary: "Equilibrio perfecto entre costo y cobertura",
        highlight: true
      },
      {
        name: "Plan Enterprise",
        subtitle: "Para empresas críticas",
        features: [
          "Soporte 24/7",
          "Monitoreo avanzado en tiempo real",
          "SLA garantizado",
          "Gestión completa TI",
          "Cloud + infraestructura",
          "Seguridad avanzada",
          "Asesoría estratégica continua"
        ],
        summary: "Máximo nivel de continuidad y control"
      }
    ]
  },
  {
    slug: "transformacion-digital-y-soluciones",
    name: "Transformación Digital y Soluciones Tecnológicas Integrales",
    nameHighlight: "y Soluciones Tecnológicas Integrales",
    description: "ONLINE System ayuda a empresas a avanzar en su transformación digital mediante la automatización de procesos, implementación de soluciones tecnológicas y gestión TI.",
    cardDescription: "Visión estratégica, soluciones de software a medida y gestión experta de proyectos para la modernización tecnológica de su empresa.",
    icon: Rocket,
    color: "text-accent",
    glow: "shadow-[0_0_20px_-10px_rgba(45,183,193,0.5)]",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    featuresTitle: "Servicios de Implementación",
    featuresTitleHighlight: "de Implementación",
    featuresSubtitle: "",
    features: [
      "Gestión TI: Administración, soporte y monitoreo continuo de la infraestructura.",
      "Análisis de necesidades: Levantamiento de procesos y detección de oportunidades de mejora.",
      "Diseño de solución: Definición de arquitectura tecnológica y automatización de procesos.",
      "Implementación: Desarrollo e integración de soluciones adaptadas al negocio.",
      "Conectividad: Integración de sistemas y plataformas mediante redes y servicios cloud.",
      "Integración con APIs: Interoperabilidad entre aplicaciones para centralizar la información.",
      "Optimización continua: Mejora constante basada en métricas y evolución del negocio."
    ]
  },
  {
    slug: "infraestructura-critica",
    name: "Servicio de Ingeniería, Redes y Telecomunicaciones",
    description: "Área de ingeniería especializada en el diseño, implementación y gestión de soluciones integrales en redes de energía eléctrica y telecomunicaciones en Chile, incluyendo cableado estructurado, sistemas de seguridad CCTV, redes de datos y telefonía digital.",
    cardDescription: "Soluciones de ingeniería en telecomunicaciones, redes críticas y seguridad CCTV para la continuidad de su negocio.",
    icon: Settings2,
    color: "text-slate-400",
    glow: "shadow-[0_0_20px_-10px_rgba(148,163,184,0.5)]",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/data.png",
    nameHighlight: "Redes y Telecomunicaciones",
    featuresTitle: "Servicios de Ingeniería en Redes",
    featuresTitleHighlight: "en Redes",
    featuresSubtitle: "",
    features: [
      "Ingeniería y Diseño de Telecomunicaciones: Diseño de redes LAN y WAN, Arquitectura de soluciones de conectividad, Planificación de infraestructura tecnológica.",
      "Cableado Estructurado y Redes de Datos: Instalación de cableado UTP y fibra óptica en Chile, Implementación de redes de alto rendimiento, Certificación de puntos de red.",
      "Sistemas de Seguridad y CCTV: Instalación de cámaras de seguridad, Sistemas de monitoreo y control, Integración con plataformas tecnológicas.",
      "Proyectos y Estudios Eléctricos: Diseño de sistemas de potencia eléctrica, Estudios de instalaciones eléctricas, Optimización energética.",
      "Implementación de Data Centers y Salas Técnicas: Diseño de salas de servidores, Instalación de racks, UPS y climatización, Infraestructura crítica para empresas.",
      "Análisis y Optimización de Redes: Evaluación de desempeño LAN/WAN, Diagnóstico de fallas, Mejora de estabilidad y rendimiento.",
      "Equipamiento y Soluciones de Comunicación: Suministro de equipos de red, Implementación de soluciones de conectividad, Integración tecnológica."
    ]
  },
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    description: "Arquitecturas en AWS, Azure y Google Cloud con enfoque en alta disponibilidad y resiliencia tecnológica.",
    icon: Cloud,
    color: "text-accent",
    glow: "shadow-[0_0_20px_-10px_rgba(45,183,193,0.5)]",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    features: [
      "Migración segura de servidores físicos a entornos Cloud.",
      "Arquitecturas Serverless y microservicios escalables.",
      "Gestión de contenedores (Docker, Kubernetes).",
      "Optimización de costos y monitoreo de recursos en la nube."
    ]
  },
  {
    slug: "ciberseguridad",
    name: "Ciberseguridad",
    description: "Análisis forense, auditorías de vulnerabilidades industriales y protección proactiva de activos digitales.",
    icon: ShieldCheck,
    color: "text-red-400",
    glow: "shadow-[0_0_20px_-10px_rgba(248,113,113,0.5)]",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    features: [
      "Ethical Hacking y pruebas de penetración (Pentesting).",
      "Implementación de arquitecturas Zero Trust y firewalls NGFW.",
      "Respuesta a incidentes y análisis forense digital.",
      "Concientización y entrenamiento en seguridad para personal."
    ]
  },
  {
    slug: "big-data-analytics",
    name: "Big Data & Analytics",
    description: "Inteligencia de negocios avanzada, dashboards de control en tiempo real y modelado predictivo.",
    icon: BarChart3,
    color: "text-primary",
    glow: "shadow-[0_0_20px_-10px_rgba(17,122,151,0.5)]",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    features: [
      "Diseño e implementación de Data Lakes y Data Warehouses.",
      "Creación de tableros directivos (Dashboards) interactivos.",
      "Análisis predictivo mediante modelos estadísticos avanzados.",
      "Integración y limpieza de múltiples fuentes de datos."
    ]
  },
  {
    slug: "inteligencia-artificial",
    name: "Inteligencia Artificial",
    description: "Implementación de redes neuronales, chatbots de nivel empresarial y automatización cognitiva.",
    icon: BrainCircuit,
    color: "text-accent",
    glow: "shadow-[0_0_20px_-10px_rgba(45,183,193,0.5)]",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    features: [
      "Desarrollo de asistentes virtuales (Bots) con NLP.",
      "Visión artificial para control de calidad industrial.",
      "Modelos de Machine Learning para optimización de demanda.",
      "Integración de LLMs en flujos de trabajo corporativos."
    ]
  },
  {
    slug: "partner-softland",
    name: "Partner tecnológico en soluciones Softland",
    description: "ONLINE System somos partner tecnológico en soluciones Softland, brindando servicios especializados en implementación, soporte y optimización de plataformas ERP para empresas en Chile.",
    cardDescription: "Especialistas en implementación, soporte y optimización de ERP Softland para potenciar la eficiencia operativa de su empresa.",
    icon: Settings2,
    color: "text-blue-500",
    glow: "shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    features: [
      "Implementación y puesta en marcha: Acompañamiento en el despliegue inicial de módulos ERP.",
      "Soporte especializado: Resolución técnica y funcional para la continuidad de su operación.",
      "Optimización de procesos: Mejora en el uso de la plataforma para maximizar la productividad.",
      "Integraciones estratégicas: Conexión de Softland con otras plataformas y ecosistemas digitales.",
      "Mejora continua: Auditorías y ajustes periódicos para alinear el sistema con el crecimiento del negocio."
    ],
    concludingText: "Acompañamos a nuestros clientes en todo el ciclo de vida de sus sistemas Softland, garantizando una gestión eficiente y escalable."
  },
];
