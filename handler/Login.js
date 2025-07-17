const UserModel = require("../model/userSchema")
const generateJwt = require("./jwt/generateJwt")

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: 'Username/email and password are required' })
        }

        const user = await UserModel.findOne({
            $or: [
                { username: username },
                { email: username }
            ],
            password
        })

        
        if (!user) {
            return res.status(401).json({ message: 'Invalid username/email or password' })
        }

        const token = generateJwt(user?._id)
        res.status(200).json({ message: 'Login successful', token })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = login