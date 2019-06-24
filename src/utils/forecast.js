const request = require('request')

const forecast = (long, lat, callback) => {
const url = 'https://api.darksky.net/forecast/f3ba037745e2aaaad67b97e0d22014e4/' + long + ','+ lat +'?units=si'

    request({
        url,
        json: true },
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather service', undefined)
            }
            else if (body.error) {
                callback('Unable to find location', undefined)
            }
            else {
                callback(undefined, body.daily.data[0].summary + ' Current temperature is ' + body.currently.temperature + 
                ' centigrade. The highest temperature today is expected to be ' + body.daily.data[0].temperatureHigh + ' centigrade, and the lowest is '
                + body.daily.data[0].temperatureLow + ' centigrade. There is a ' + body.daily.data[0].precipProbability + '% chance of rain.')
            }
    })
}

module.exports = forecast

