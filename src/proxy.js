const express = require('express')
const cookieParser = require('cookie-parser')
const proxy = require('http-proxy-middleware')
const helmet = require('helmet')
const path = require('path')

const authRouter = require("./routers/authRouter").authRouter
const checkAuth = require("./routers/authRouter").checkAuth

const config = require("../config")

const app = express()
app.use(helmet())
app.use(cookieParser())

// Proxy routes
const options = {
    target: 'http://127.0.0.1:1235',
    pathRewrite: (path, req) => path.replace('/flood', '')
}

// Unprotected routes
app.use('/auth', authRouter)

// Protected routes
app.use('/', checkAuth)
app.use('/flood', proxy(options))

app.listen(3000, () => console.log('Reverse proxy listening on port 3000!'))
