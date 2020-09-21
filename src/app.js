const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast =require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup  handlbars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Serhii'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Serhii'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Serhii'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide provide an address'
        });  
    }
    geocode(address, (error, {lat, lon} = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
    
        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                address: address,
                forecastData: forecastData
            });
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article wasn\'t found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page wasn\'t found'
    });
});
// app.com
// app.com/help
// app.com/about

// Goal: Create and render a 404 page with handlebars
//
// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template fo both 404 routes
//      - Page not found.
//      - Help article not found.
// 4. Test your work. Visit /what and /help/units

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

    
