const express = require('express')
const loginRoute = require('./loginRoute')
const customerRouter = require('./customersRoute')
const verifyJwt = require('../handler/jwt/verifyJwt')
const mainRoute = express.Router()

mainRoute.use('/', loginRoute)
mainRoute.use('/customers', verifyJwt, customerRouter)

module.exports = mainRoute