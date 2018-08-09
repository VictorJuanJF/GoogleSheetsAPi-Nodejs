const axios = require('axios');
const express = require('express');
const app = express();
const GoogleSheets = require('./google');
const fs = require('fs');

//Parte del servidor
const hbs = require('hbs');
//require('./hbs/helpers/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
//Express HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
//Helpers


app.get('/', (req, res) => {


    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        GoogleSheets.authorize(JSON.parse(content), (oAuth2Client) => {
            GoogleSheets.listMajors(oAuth2Client, (getRows) => {
                res.render('home', { rows: getRows });
                //console.log(rows);
            });
            //console.log(getRows);
        });
    });



});



app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});


// Load client secrets from a local file.