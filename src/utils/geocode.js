const request = require('request')

//retrieve lat, long and location data from entered location

const geocode = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2ltb25tMjciLCJhIjoiY2p3YzE4NHNsMDdpaDN6cTEwd2x0am1sYiJ9.C3d73t-oKSO18q7KbVPEWg&limit=1'

    request({
        url: url,
        json: true },
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to location service', undefined)
            }
            else if (body.features.length === 0) {
                callback('Unable to find loction. Try another search', undefined)
            }
            else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
    })
}

module.exports = geocode