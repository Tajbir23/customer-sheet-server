const jwt = require('jsonwebtoken')

const generateJwt = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '365d'})
    return token
}

module.exports = generateJwt