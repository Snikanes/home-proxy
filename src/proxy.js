const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const proxy = require('http-proxy-middleware')
const helmet = require('helmet')
const jwt = require('jsonwebtoken');
const path = require('path')

const config = require("../config")
const auth = require("../auth")


// Constants
const JWT_COOKIE_NAME = 'jwtToken'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) 
app.use(cookieParser())

const options = {
    target: 'http://127.0.0.1:1235',
    pathRewrite: {'/flood' : ''}
}

const checkAuth = (req, res, next) => {
    const token = req.cookies[JWT_COOKIE_NAME]
    if(!token) {
        return res.redirect('/login')
    }

    const decoded = jwt.verify(token, auth.jwtSecret)
    if(decoded === auth.username) {
        return next()
    }
}


app.get('/login', (req, res) => {
    res.sendFile(path.resolve('static/login.html'))
})

app.post('/login', (req, res) => {
    if(req.body) {
        const username = req.body.username
        const password = req.body.password

        if(username === auth.username && password === auth.password) {
            const token = jwt.sign(username, auth.jwtSecret)
            res.cookie(JWT_COOKIE_NAME, token)
            res.sendFile(path.resolve('static/loginSuccessful.html'))
        }
    }
    res.status(403)
    res.send("Wrong credentials")
})

app.use(helmet())
app.use('/', checkAuth)
app.use('/flood', proxy(options))
app.listen(3000, () => console.log('Reverse proxy listening on port 3000!'))