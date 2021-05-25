const request = require('postman-request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3N2MTQzNyIsImEiOiJja256b3QzcmEwN3g4MzNwOWxwMmlsZXRnIn0.IdUKI1p7xi81p542VX_vnQ&limit=1'
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect location services",undefined)
        }
        else if (body.features.length === 0) {
            callback("Unable to find location",undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode