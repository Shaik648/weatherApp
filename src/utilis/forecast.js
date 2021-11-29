const request = require("request")

const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude, '.')
    const url = 'http://api.weatherstack.com/current?access_key=0dcaa4f0bac6155328329945443b7cec&query=' + latitude + ',' + longitude + '&unit=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, body.current.temperature)
            console.log(body.current)

        }

    })

}
module.exports = forecast