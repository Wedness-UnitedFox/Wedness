const jwt = require('jsonwebtoken')

const signToken = (payload) => {
    const token = jwt.sign(payload, 'secret123')
    return token
}
const verifyToken = (token) => {
    const decode = jwt.verify(token, 'secret123')
    return decode
}

module.exports = { signToken, verifyToken } 