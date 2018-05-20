const express = require('express')
const session = require('express-session')
const request = require('request')
const helmet = require('helmet')

const config = require("../config")

const app = express()

// Define stuff to use
app.use(helmet())
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.all('*', (req, res) => {
    res.send("Hello world")
})

app.listen(3000, () => console.log('Reverse proxy listening on port 3000!'))