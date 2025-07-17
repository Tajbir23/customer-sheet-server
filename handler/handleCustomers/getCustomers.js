const customersModel = require("../../model/customersSchema")

const getCustomers = async(req, res) => {
    const { search } = req.query

    try {
        const user = req?.user
        
        let query = { user: user }
        
        if (search) {
            query = {
                ...query,
                $or: [
                    { customerName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { orderFrom: { $regex: search, $options: 'i' } },
                    { gptAccount: { $regex: search, $options: 'i' } }
                ]
            }
        }

        const customers = await customersModel.find(query)
        

        res.status(200).json({
            success: true, 
            message: 'Customers fetched successfully', 
            customers
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false, 
            message: 'Internal server error'
        })
    }
}

module.exports = getCustomers