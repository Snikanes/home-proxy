const express = require('express')
const session = require('express-session')
const request = require('request-promise-native')
const proxy = require('http-proxy-middleware')
const helmet = require('helmet')

const config = require("../config")

const app = express()

//const onReq = (proxyReq, req, res) => {
//    console.log(proxyReq.headers)
//    console.log(req)
//    proxyReq.headers = req.headers
//
//
//const onRes = (proxyRes, req, res) => {
//    console.log(proxyRes.headers)
//

const options = {
    target: 'http://127.0.0.1:1235/',
    //onProxyReq: onReq,
}

app.use('/flood', proxy(options))
app.listen(3000, () => console.log('Reverse proxy listening on port 3000!'))