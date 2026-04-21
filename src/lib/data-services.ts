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
    slug: "soporte-especializado",
    name: "Contrato y Soporte de Mantenimiento Preventivo",
    description: "Garantiza la continuidad operativa de tu empresa con un servicio integral de soporte TI y mantenimiento preventivo, diseñado para anticipar fallas, optimizar el rendimiento de tus sistemas y asegurar la estabilidad de tu infraestructura tecnológica.",
    cardDescription: "Soporte TI integral y mantenimiento preventivo para garantizar la continuidad operativa y estabilidad de su infraestructura tecnológica.",
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
    description: "Diseñamos y desplegamos infraestructura de red robusta, desde cableado estructurado certificado hasta arquitecturas de centros de datos, garantizando la máxima disponibilidad y seguridad para las operaciones más exigentes de su empresa.",
    cardDescription: "Soluciones de ingeniería en telecomunicaciones, redes críticas y seguridad CCTV para la continuidad de su negocio.",
    icon: Settings2,
    color: "text-slate-400",
    glow: "shadow-[0_0_20px_-10px_rgba(148,163,184,0.5)]",
    image: "/network-engineering.png",
    nameHighlight: "Redes y Telecomunicaciones",
    featuresTitle: "Servicios de Ingeniería en Redes",
    featuresTitleHighlight: "en Redes",
    featuresSubtitle: "",
    features: [
      "Ingeniería y Diseño de Redes de Próxima Generación: Planificación estratégica estructurada para arquitecturas LAN/WAN escalables y resilientes.",
      "Infraestructura de Fibra Óptica y Cableado Certificado: Instalación de alta densidad con certificación garantizada para máxima velocidad y estabilidad.",
      "Ciberseguridad en Capa de Red: Implementación de Firewalls de próxima generación, segmentación mediante VLANs y protección perimetral avanzada.",
      "Infraestructura para Centros de Datos: Diseño térmico, sistemas de UPS redundantes y gestión de racks para operaciones críticas.",
      "Soluciones de Comunicaciones Unificadas (SIP/VoIP): Despliegue de telefonía IP flexible con integración total en dispositivos móviles y de escritorio.",
      "Seguridad Electrónica y Videovigilancia IP: Sistemas CCTV de alta resolución con analítica inteligente y almacenamiento centralizado.",
      "Control de Acceso Biométrico: Sistemas de seguridad de alta precisión mediante huella dactilar y reconocimiento facial/iris, con registros de auditoría centralizados.",
      "Proyectos y Estudios Eléctricos: Ingeniería de sistemas de potencia, tableros eléctricos, certificación SEC y auditorías de eficiencia energética corporativa."
    ],
    concludingText: "Construimos la columna vertebral tecnológica que soporta el crecimiento y la continuidad de su organización."
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
  {
    slug: "integracion-sistemas",
    name: "Implementación e Integración de Sistemas ERP y APIs",
    nameHighlight: "Sistemas ERP y APIs",
    description: "Centralice sus operaciones conectando su ecosistema tecnológico. Nos especializamos en la integración de ERPs como Softland, SAP y Defontana con e-commerce, CRM y software financiero, eliminando la duplicidad de funciones.",
    cardDescription: "Conectamos sus operaciones, sistemas core y ERPs para lograr una automatización centralizada y segura.",
    icon: Code2,
    color: "text-primary",
    glow: "shadow-[0_0_20px_-10px_rgba(17,122,151,0.5)]",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    featuresTitle: "Casos de ",
    featuresTitleHighlight: "Uso",
    featuresSubtitle: "Escenarios comunes resueltos con nuestra experticia en integraciones.",
    features: [
      "Comercio Omnicanal (E-commerce ↔ ERP): Sincronice inventarios, precios y órdenes de compra en tiempo real entre Shopify, VTEX o MercadoLibre y su ERP (Softland, SAP). Evite quiebres de stock y doble digitación al instante.",
      "Cierre Contable y Financiero Automatizado: Conecte su ERP con pasarelas de pago (Transbank, MercadoPago), facturación electrónica (DTE) y bancos. Reduzca errores humanos en conciliaciones y cierre el mes de forma impecable.",
      "Gestión de Capital Humano Integrada: Vincule plataformas de RRHH (Buk, Talana) con su ecosistema financiero para automatizar la contabilidad de nóminas, liquidaciones y requerimientos corporativos sin intervención manual.",
      "Logística y Trazabilidad en la Nube: Conecte su sistema de gestión de bodegas (WMS) o proveedores logísticos a su central para despachar más rápido y tener la información de flujo logístico bajo control.",
      "Consolidación de Datos (Business Intelligence): Olvídese de cruzar Excels eternos. Unificamos la data de sus múltiples sistemas para que tome decisiones directivas certeras y en tiempo real con tableros interactivos (Power BI, Tableau).",
      "Rescate de Sistemas Legacy (Heredados): Si tiene sistemas antiguos críticos, construimos una capa de APIs a la medida para extender su vida útil y conectarlos con la nube de forma ágil y 100% segura."
    ],
    concludingText: "Nuestros clientes logran un Retorno de Inversión (ROI) en menos de 6 meses al liberar a sus equipos del colapso administrativo.",
    plans: [
      {
        name: "Evaluación Diagnóstica",
        subtitle: "Para iniciar integraciones",
        features: [
          "Mapeo de arquitectura TI",
          "Revisión de viabilidad técnica",
          "Propuesta de roadmap"
        ],
        summary: "Para entender por dónde empezar"
      },
      {
        name: "Integración Dedicada",
        subtitle: "Ejecución de procesos",
        features: [
          "Desarrollo de conectores API",
          "Automatización de 2 a 3 sistemas",
          "Mapeo de procesos",
          "Soporte post-despliegue"
        ],
        summary: "Automatización estándar corporativa",
        highlight: true
      },
      {
        name: "Arquitectura Enterprise",
        subtitle: "Agnosticismo total",
        features: [
          "Microservicios avanzados",
          "Migración a Cloud",
          "Sincronización multi-país/multi-empresa",
          "Soporte y SLA 24/7"
        ],
        summary: "Para operaciones de gran escala"
      }
    ]
  },
  {
    slug: "oficina-virtual-inteligente",
    name: "Oficina Virtual Inteligente",
    description: "Transforme sus oficinas y salas de reunión físicas con tecnología avanzada. Nuestro servicio de Oficina Virtual Inteligente integra sistemas de comunicación de alta calidad, control de acceso y sensores IoT para garantizar seguridad, colaboración y confort.",
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
