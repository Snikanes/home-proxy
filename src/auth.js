const jwt = require('jsonwebtoken');
const auth = require("../auth")

const verifyToken = token => {
    const decoded = jwt.verify(token, auth.jwtSecret)
    return decoded === auth.username
}

const authenticate = (username, password) => {
    if(username === auth.username && password === auth.password) {
        return jwt.sign(username, auth.jwtSecret)
    }
    return false
}

module.exports = {
    verifyToken: verifyToken,
    authenticate: authenticate
}

