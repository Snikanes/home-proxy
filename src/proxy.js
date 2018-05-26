const express = require('express')
const session = require('express-session')
const request = require('request-promise-native')
const proxy = require('http-proxy-middleware')
const helmet = require('helmet')

const config = require("../config")

const app = express()

const options = {
    target: 'http://127.0.0.1:1235',
    pathRewrite: {'/flood' : ''}
}

app.use('/flood', proxy(options))
app.listen(3000, () => console.log('Reverse proxy listening on port 3000!'))