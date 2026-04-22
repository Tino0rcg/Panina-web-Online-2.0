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

async function createBanner() {
    try {
        console.log("Downloading icons...");
        const buf1 = await downloadImage('https://img.icons8.com/color/96/shield.png');
        const buf2 = await downloadImage('https://img.icons8.com/color/96/settings.png');
        const buf3 = await downloadImage('https://img.icons8.com/color/96/rocket.png');
        const buf4 = await downloadImage('https://img.icons8.com/color/96/idea.png');

        console.log("Loading images...");
        const logo = await Jimp.read('public/img/Logo ONLINE System.jpeg');
        const icon1 = await Jimp.read(buf1);
        const icon2 = await Jimp.read(buf2);
        const icon3 = await Jimp.read(buf3);
        const icon4 = await Jimp.read(buf4);

        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

        const bannerW = 1400;
        const bannerH = 500;
        const bg = new Jimp(bannerW, bannerH, '#FFFFFF');

        // Layout:
        // Left column (X: 50 to 550) - Logo
        logo.scaleToFit(450, 400);
        const logoY = Math.floor((bannerH - logo.bitmap.height) / 2);
        bg.composite(logo, 50, logoY);

        // Right side: 2 cols x 2 rows
        const col1X = 550;
        const col2X = 950;
        const row1Y = 70;
        const row2Y = 270;
        const iconSize = 80;

        icon1.resize(iconSize, iconSize);
        icon2.resize(iconSize, iconSize);
        icon3.resize(iconSize, iconSize);
        icon4.resize(iconSize, iconSize);

        const textOffsetX = iconSize + 20;
        const textMaxWidth = 280;

        // Strip accents just in case Jimp font misses them (avoids rendering bugs)
        // Jimp default fonts are notoriously bad with accents.
        const t1 = "Nos encargamos de que tu empresa nunca se detenga";
        const t2 = "Reducimos costos automatizando procesos";
        const t3 = "Modernizamos tu operacion TI";
        const t4 = "Somos tu area TI estrategica";

        // Draw 1
        bg.composite(icon1, col1X, row1Y);
        bg.print(font, col1X + textOffsetX, row1Y - 5, { text: t1, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, textMaxWidth, iconSize + 10);

        // Draw 2
        bg.composite(icon2, col2X, row1Y);
        bg.print(font, col2X + textOffsetX, row1Y - 5, { text: t2, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, textMaxWidth, iconSize + 10);

        // Draw 3
        bg.composite(icon3, col1X, row2Y);
        bg.print(font, col1X + textOffsetX, row2Y - 5, { text: t3, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, textMaxWidth, iconSize + 10);

        // Draw 4
        bg.composite(icon4, col2X, row2Y);
        bg.print(font, col2X + textOffsetX, row2Y - 5, { text: t4, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, textMaxWidth, iconSize + 10);

        await bg.writeAsync('public/img/logo.png');
        console.log("White banner completed!");

    } catch (e) {
        console.error(e);
    }
}

createBanner();
