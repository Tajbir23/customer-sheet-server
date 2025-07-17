const customersModel = require("../../model/customersSchema")

const addCustomers = async (req, res) => {
    const user = req?.user
    try {
        const data = req.body
        data.user = user
        const customer = await customersModel.create(data)

        res.status(200).json({success: true, message: 'Customer added successfully', customer, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports = addCustomers