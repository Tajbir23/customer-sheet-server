require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db/db')
const mainRoute = require('./routes/mainRoute')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ['http://localhost:5173', 'https://customer-sheet.vercel.app']
}))
app.use('/api', mainRoute)

app.get('/', (req, res) => {
    res.send('Hello World')
})
// database connection
db()

// server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})

