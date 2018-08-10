const hbs = require('hbs');

hbs.registerHelper('hola', (text) => {
    return `Probando esto variable: ${text} Helper XD `;
});