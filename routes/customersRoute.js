const express = require('express')
const addCustomers = require('../handler/handleCustomers/addCustomers')
const getCustomers = require('../handler/handleCustomers/getCustomers')
const editCustomerInfo = require('../handler/handleCustomers/editCustomerInfo')
const deleteCustomer = require('../handler/handleCustomers/deleteCustomer')
const customerRouter = express.Router()

customerRouter.post('/add', addCustomers)
customerRouter.get('/get', getCustomers)
customerRouter.put('/edit/:id', editCustomerInfo)
customerRouter.delete('/delete/:id', deleteCustomer)

module.exports = customerRouter