const request = require('postman-request');
const mapBoxAPI = 'pk.eyJ1IjoiZHJvbWl4IiwiYSI6ImNrZjB3NjZzcTBuMWgyeXBoZWppaGJjbjAifQ.plA1g6mK1hp_jKJtmYW5IA';


const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address.trim())}.json?access_token=${mapBoxAPI}&limit=1`;
    
    request({url, json: true}, (error, {body: {features}}) => {
        if (error) {
            cb('Unable to connect to location service', undefined);
        } else if (features.length === 0) {
            cb('I can\'t find this location', undefined);
        } else {
            const {place_name: region, center: [lat, lon]} = features[0];
            cb(undefined, {region, lat, lon});
        }
    });
};

module.exports = geocode;