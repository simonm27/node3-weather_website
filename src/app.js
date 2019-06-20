const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partials)

//Set up static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Simon Minifie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page',
        name: 'Simon Minifie'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Simon Minifie'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must supply an address to search for'
        })
    }
     const address = req.query.address

        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
              return res.send({
                  error
              })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }

                res.send({
                    location,
                    forecast: forecastData,
                    address
                })
        
            })
        })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        name: 'Simon Minifie',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        name: 'Simon Minifie',
        title: '404'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
