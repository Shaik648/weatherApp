const path = require('path')
const express = require('express')
const exp = require('constants')
const hbs = require('hbs')
const gecode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')


const { hasSubscribers } = require('diagnostics_channel')
console.log(__dirname)
console.log(path.join(__dirname, '../pubilc'))


const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Muneer'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Muneer'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Muneer',
        helpText: 'This is some helpful text',

    })
})
app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    gecode(req.query.address, (error, { latitude, longtitude, location }) => {
        console.log('ap', latitude, longtitude, location)

        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: "It is snowing",
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muneer',
        errorMessage: 'Help artical Not Found'
    })

})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muneer',
        errorMessage: 'Page Not Found'
    })

})

// app.com/

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})