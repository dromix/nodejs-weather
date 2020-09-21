const request = require('postman-request');
const weatherAPI = '3b87993fe264b2f09ba97e824c2b905e';

const forecast = (lat, lon, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=${weatherAPI}&query=${lon},${lat}`;

    request({url, json: true}, (error, 
        {
        body:{
            error: bodyErorr, 
            location:{region, lat, lon}, 
            current:{temperature}
        }}) => {
        if (error) {
            cb('Unable to connect to location service', undefined);
        } else if (bodyErorr) {
            cb(bodyErorr.type, undefined);
        } else {
            cb(undefined, {region, lat, lon, temperature});
        }
    });
};

module.exports = forecast;


// const request = require('postman-request');
// const weatherAPI = '3b87993fe264b2f09ba97e824c2b905e';


// const forecast = (lat, lon, cb) => {
//     const url = `http://api.weatherstack.com/current?access_key=${weatherAPI}&query=${lon},${lat}`;

//     request({url, json: true}, (error, response) => {
//         if (error) {
//             cb('Unable to connect to location service', undefined);
//         } else if (response.body.error) {
//             cb(response.body.error.type, undefined);
//         } else {
//             const {name, region, lat, lon} = response.body.location;
//             const temperature = response.body.current.temperature;
//             cb(undefined, {name, region, lat, lon, temperature});
//         }
//     });
// };

// module.exports = forecast;
