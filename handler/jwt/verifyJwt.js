const jwt = require('jsonwebtoken')

const verifyJwt = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message: 'Unauthorized'})
            }
            req.user = decoded.id
            next()
        })
        
    } catch (error) {
        res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports = verifyJwt