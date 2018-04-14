const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.port || 3000

var app = express()

// Static server setup (2)
app.use(express.static(__dirname + '/public'))

// Set 'hbs' (3)
app.set('view engine', 'hbs')

// Register partials (4)
hbs.registerPartials(__dirname + '/views/partials')

// register helper to 'hbs' (5)
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

// Midleware (6) - To track how our server is working
app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    })
    next()
})

// For middlelayer
// app.use((req, res, next) => {
//     res.render('maintenence.hbs', {
//         pageTitle: 'Under Maintenence',
//         message: 'Will be back soon. Thank you for visiting!!'
//     })
// })


// Http route handlers (1)
app.get('/', (req, res) => {
    // res.send('Hello Express!')

    // res.send('<h1>Hello Express</h1>')  

    res.send({
        name: 'Abhishek Shukla',
        address: '153, II-E Nehru Nagar, Ghaziabad, UP 201001',
        emailId: [
            'ramabhi777@gmail.com',
            'in.abhishek.shukla@gmail.com'
        ]
    })
})

var currentYear = new Date().getFullYear()
// Using 'hbs' to render the data
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About hbs page'
    })
})

// Using 'hbs' to render the data
app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page title',
        message: 'Welcome to home'
    })
})

app.listen(port, () => {
    console.log(`Server is up and ready on port ${port}.`)
})