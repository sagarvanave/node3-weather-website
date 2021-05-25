const request = require('postman-request')

const forecast=(lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5b2abb6fee3396bd7c4e667c6a313591&query=' + lat + ',' + long + '&units=m'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to access API",undefined)
        }
        else if (body.error) {
            callback("Unable to find location",undefined)
        }
        else {
            let temp = body.current.temperature
            let feelslike = body.current.feelslike
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + temp + " degrees out. It feels like " + feelslike + " degrees out.")
        }
    })
}

module.exports = forecast
