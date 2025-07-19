const customersModel = require("../../model/customersSchema");

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const customer = await customersModel.findByIdAndDelete(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({success: true, message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error" });
    }
}

module.exports = deleteCustomer;