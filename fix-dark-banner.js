const fs = require('fs');
const https = require('https');
const Jimp = require('jimp');

const downloadImage = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => resolve(Buffer.concat(data)));
        }).on('error', err => reject(err));
    });
};

async function processImage() {
    try {
        console.log("Loading image...");
        const banner = await Jimp.read('logo_online_system_hd_1.png');
        
        // Font
        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);

        // Crop to banner area exactly like before
        const currentWidth = banner.bitmap.width; // 1024
        const currentHeight = banner.bitmap.height; // 1024
        const targetHeight = Math.floor(currentWidth * (200 / 650)); // ~315
        const yOffset = Math.floor((currentHeight - targetHeight) / 2); // ~354
        
        banner.crop(0, yOffset, currentWidth, targetHeight);
        
        // Clear text under original 3 icons
        // The original text (CLOUD, NETWORKING, SECURITY) is under Y = 195.
        // We will sample a clean background pixel to cover it.
        const bgColor = banner.getPixelColor(10, targetHeight - 10);
        for (let y = 180; y < targetHeight; y++) {
            for (let x = 0; x < 650; x++) {
                banner.setPixelColor(bgColor, x, y);
            }
        }
        
        // Download 2 new white icons for the new services
        console.log("Downloading icons...");
        const buf1 = await downloadImage('https://img.icons8.com/ios-filled/96/ffffff/settings.png');
        const buf2 = await downloadImage('https://img.icons8.com/ios-filled/96/ffffff/idea.png');
        const icon4 = await Jimp.read(buf1);
        const icon5 = await Jimp.read(buf2);
        
        icon4.resize(45, 45);
        icon5.resize(45, 45);

        // Approximate X centers from the original: Cloud~160, Net~260, Sec~360
        // We'll place Icon4 at 460, and Icon5 at 560
        const yPosIcons = 105;
        banner.composite(icon4, 460 - 22, yPosIcons);
        banner.composite(icon5, 560 - 22, yPosIcons);
        
        // Print text
        const writeCentered = (text, centerX, y) => {
            const textWidth = Jimp.measureText(font, text);
            banner.print(font, centerX - (textWidth / 2), y, text);
        };
        
        const writeBoxed = (text, startX, y, maxW) => {
            banner.print(font, startX, y, { text, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, maxW);
        };

        const textY = 190;
        
        // 1. Diagnostico 360
        writeCentered("Diagnóstico 360", 160, textY);
        
        // 2. Nos encargamos de que tu empresa nunca se detenga
        writeBoxed("Empresa protegida", 260 - 50, textY, 100);
        // "Nos encargamos de tu empresa que nunca se detenga" is too long to fit vertically.
        // But the user requested exact text! We MUST use the text.
        // Wait, Jimp prints to multiple lines if wrapped.
        // maxW = 95 helps it wrap across 3-4 lines without hitting other texts.
        
        const textY2 = 185;
        writeBoxed("Nos encargamos de que tu empresa nunca se detenga", 260 - 45, textY2 - 10, 95);
        
        // 3. Ciberseguridad
        writeCentered("Ciberseguridad", 355, textY);
        
        // 4. Reducimos tus costos automatizando procesos
        writeBoxed("Reducimos tus costos automatizando procesos", 460 - 45, textY2 - 10, 95);
        
        // 5. Somos tu área de TI mas estrategica
        writeBoxed("Somos tu área de TI mas estrategica", 560 - 45, textY2 - 10, 95);

        // Clean any weird pixel artifacts left underneath
        
        // Save
        const outPath = 'public/img/logo.png';
        await banner.writeAsync(outPath);
        console.log(`White text baked onto dark abstract banner with 5 icons!`);

    } catch (e) {
        console.error(e);
    }
}

processImage();
