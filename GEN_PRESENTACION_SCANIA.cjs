const pptxgen = require('pptxgenjs');
const path = require('path');

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'Sistema de Control de Acceso Scania';
pres.company = 'ONLINE System';

// Colores Scania/ONLINE System
const SCANIA_BLUE = "041E42";
const SCANIA_RED = "D6001C";
const ONLINE_LIGHT_BLUE = "00A9E0";
const DARK_BG = "0B132B";

// --- Slide 1: Portada ---
let slide1 = pres.addSlide();
slide1.background = { color: DARK_BG };
slide1.addText("SISTEMA DE CONTROL DE ACCESO", {
    x: 0, y: 3.5, w: "100%", h: 1,
    color: "FFFFFF", fontSize: 44, bold: true, align: "center", fontFace: "Arial"
});
slide1.addText("SOLUCIÓN PROFESIONAL OFFLINE PARA SCANIA", {
    x: 0, y: 4.5, w: "100%", h: 0.5,
    color: ONLINE_LIGHT_BLUE, fontSize: 20, align: "center", fontFace: "Arial"
});
// Logo (asumiendo que se copió a PRESENTACION_SCANIA/logo.png)
slide1.addImage({ path: path.join(__dirname, 'PRESENTACION_SCANIA', 'logo.png'), x: 4.0, y: 1.0, w: 2.0, h: 2.0 });

// --- Slide 2: El Desafío y la Solución ---
let slide2 = pres.addSlide();
slide2.addText("CONTINUIDAD OPERATIVA EN TODO MOMENTO", { x: 0.5, y: 0.5, color: SCANIA_BLUE, fontSize: 28, bold: true });
slide2.addText("• 100% Offline: No requiere internet para el registro de visitas.\n• Modo Kiosko: Bloqueo de terminal para seguridad del guardia.\n• Base de Datos Local: SQLite de alta velocidad para millones de registros.\n• Puente Móvil: Conexión directa con tablets Samsung vía red local.", {
    x: 0.5, y: 1.5, w: 9, h: 4, fontSize: 20, color: "333333"
});

// --- Slide 3: Dashboard e Inteligencia de Datos ---
let slide3 = pres.addSlide();
slide3.addText("DASHBOARD Y CONTROL EN TIEMPO REAL", { x: 0.5, y: 0.5, color: SCANIA_BLUE, fontSize: 28, bold: true });
slide3.addText("Visualización de métricas y gestión de accesos con IP Discovery.", { x: 0.5, y: 1.2, fontSize: 16, color: "666666" });
// Imagen del overview
slide3.addImage({ path: path.join(__dirname, 'PRESENTACION_SCANIA', 'video_overview.webp'), x: 1, y: 1.8, w: 8, h: 4.5 });

// --- Slide 4: Registro de Visitas ---
let slide4 = pres.addSlide();
slide4.addText("REGISTRO DE VISITAS ÁGIL Y SEGURO", { x: 0.5, y: 0.5, color: SCANIA_BLUE, fontSize: 28, bold: true });
slide4.addText("Escaneo de carnet con tablet Samsung y sincronización instantánea.", { x: 0.5, y: 1.2, fontSize: 16, color: "666666" });
slide4.addImage({ path: path.join(__dirname, 'PRESENTACION_SCANIA', 'video_completo.webp'), x: 1, y: 1.8, w: 8, h: 4.5 });

// --- Slide 5: ONLINE System - Su Socio Tecnológico ---
let slide5 = pres.addSlide();
slide5.background = { color: DARK_BG };
slide1.addImage({ path: path.join(__dirname, 'PRESENTACION_SCANIA', 'logo.png'), x: 4.2, y: 1.5, w: 1.5, h: 1.5 });
slide5.addText("PRESENTADO POR ONLINE SYSTEM", {
    x: 0, y: 3.5, w: "100%", h: 0.8,
    color: "FFFFFF", fontSize: 32, bold: true, align: "center"
});
slide5.addText("Transformación Digital y Continuidad Operativa", {
    x: 0, y: 4.2, w: "100%", h: 0.5,
    color: ONLINE_LIGHT_BLUE, fontSize: 18, align: "center"
});

const outPath = path.join(__dirname, "PRESENTACION_SCANIA_SISTEMA.pptx");
pres.writeFile({ fileName: outPath }).then(() => {
    console.log("SUCCESS: " + outPath);
}).catch((err) => {
    console.error(err);
});
