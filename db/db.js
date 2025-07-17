const mongoose = require('mongoose')

const db = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
        return mongoose.connection
    } catch (error) {
        console.log(error)
    }
}

module.exports = db