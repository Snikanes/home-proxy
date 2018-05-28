const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

const auth = require('../auth')
const config = require("../../config")

const router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const checkAuth = (req, res, next) => {
    const token = req.cookies[config.JWT_COOKIE_NAME]
    if(!token) {
	    res.status(403)
        return res.send()
    }
    return auth.verifyToken(token) ? next() : res.status(403).send("Access forbidden")
}

router.post('/', (req, res) => {
    if(req.body) {
        const token = auth.authenticate(req.body.username, req.body.password) 
        if (token) {
            res.cookie(config.JWT_COOKIE_NAME, token)
            return res.send('Login success')
        }
        res.status(403)
        res.send("Wrong credentials")
    }
    res.status(400)
    res.send("Missing request body")
})

module.exports = {
    authRouter: router,
    checkAuth: checkAuth
}