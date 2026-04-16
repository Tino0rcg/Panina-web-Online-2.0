const pptxgen = require('pptxgenjs');

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

let slide = pres.addSlide();

// Fondo principal oscuro/elegante corporativo
slide.background = { color: "0B132B" }; 

// Título
slide.addText("MAXIMICE SU RETORNO DE INVERSIÓN (ROI)", {
  x: 0, y: 0.5, w: "100%", h: 0.8,
  color: "FFFFFF", fontSize: 32, bold: true, align: "center", fontFace: "Arial"
});

// Subtítulo
slide.addText("Transforme la tecnología de un centro de costos a un motor de crecimiento sostenible", {
  x: 0, y: 1.2, w: "100%", h: 0.5,
  color: "4ECDC4", fontSize: 18, align: "center", fontFace: "Arial"
});

// Cuadro 1: El Desafío
slide.addShape(pres.ShapeType.rect, { x: 0.8, y: 2.2, w: 2.5, h: 4, fill: "1C2541", roundness: 0.1 });
slide.addText("EL DESAFÍO", { x: 0.8, y: 2.5, w: 2.5, color: "FF6B6B", fontSize: 16, bold: true, align: "center", fontFace: "Arial" });
slide.addText("• Inactividad no planificada\n\n• Sistemas fragmentados\n\n• Procesos manuales lentos\n\n• Fuga de capital operativo", { 
  x: 1.0, y: 3.2, w: 2.1, color: "E0E0E0", fontSize: 14, align: "left", fontFace: "Arial" 
});

// Flecha 1
slide.addShape(pres.ShapeType.rightArrow, { x: 3.4, y: 4.1, w: 0.2, h: 0.2, fill: "4ECDC4" });

// Cuadro 2: La Solución
slide.addShape(pres.ShapeType.rect, { x: 3.7, y: 2.2, w: 2.5, h: 4, fill: "1C2541", roundness: 0.1 });
slide.addText("LA SOLUCIÓN", { x: 3.7, y: 2.5, w: 2.5, color: "4ECDC4", fontSize: 16, bold: true, align: "center", fontFace: "Arial" });
slide.addText("• Integración fluida (ERP)\n\n• Automatización transversal\n\n• Visualización de datos\n\n• Máxima disponibilidad", { 
  x: 3.9, y: 3.2, w: 2.1, color: "E0E0E0", fontSize: 14, align: "left", fontFace: "Arial" 
});

// Flecha 2
slide.addShape(pres.ShapeType.rightArrow, { x: 6.3, y: 4.1, w: 0.2, h: 0.2, fill: "4ECDC4" });

// Cuadro 3: El Impacto (ROI) - Destacado
slide.addShape(pres.ShapeType.rect, { x: 6.6, y: 1.9, w: 2.8, h: 4.6, fill: "4ECDC4", roundness: 0.1 });
slide.addText("EL IMPACTO (ROI)", { x: 6.6, y: 2.3, w: 2.8, color: "0B132B", fontSize: 20, bold: true, align: "center", fontFace: "Arial" });
slide.addText("↓ Reducción de Costos\n(Prevención de pérdidas)\n\n↑ Máxima Productividad\n(Más eficiencia y agilidad)\n\n✓ Payback Acelerado\n(Recuperación de la inversión\nen tiempo récord)", { 
  x: 6.8, y: 3.2, w: 2.4, color: "0B132B", fontSize: 14, bold: true, align: "center", fontFace: "Arial" 
});

// Footer
slide.addText("«Una inversión estratégica en TI blinda sus operaciones comerciales para el futuro.»", {
  x: 0, y: 6.6, w: "100%", h: 0.5,
  color: "FFFFFF", fontSize: 14, align: "center", fontFace: "Arial", italic: true
});

const outPath = "C:\\\\Users\\\\Alejandro\\\\Downloads\\\\Resumen_Comercial_ROI.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
    console.log("SUCCESS");
}).catch((err) => {
    console.error(err);
});
