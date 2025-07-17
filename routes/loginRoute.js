const express = require('express')
const login = require('../handler/Login')
const loginRoute = express.Router()

loginRoute.post('/login', login)

module.exports = loginRoute