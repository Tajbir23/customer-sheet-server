const customersModel = require("../../model/customersSchema")

const editCustomerInfo = async(req, res) => {
    const { id } = req.params
    const {subscriptionEnd, gptAccount, orderDate, note, reminderDate, reminderNote, paymentStatus, paidAmount, paymentDate, paymentMethod} = req.body

    const customer = await customersModel.findByIdAndUpdate(id, {subscriptionEnd, gptAccount, orderDate, note, reminderDate, reminderNote, paymentStatus, paidAmount, paymentDate, paymentMethod}, {new: true})

    res.status(200).json({
        success: true, 
        message: 'Customer info updated successfully',
        customer
    })
}

module.exports = editCustomerInfo