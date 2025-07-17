const customersModel = require("../model/customersSchema")

const getSubscriptionEndDate = async() => {
    try {
        // Get current date and set time to midnight for comparison
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        // Get date 3 days from now
        const threeDaysFromNow = new Date(currentDate)
        threeDaysFromNow.setDate(currentDate.getDate() + 3)

        // Get date 4 days from now (to create a 24-hour window)
        const fourDaysFromNow = new Date(currentDate)
        fourDaysFromNow.setDate(currentDate.getDate() + 4)

        // Find customers whose subscription ends in 3 days
        // and populate the user data
        const customers = await customersModel.find({
            subscriptionEnd: {
                $gte: threeDaysFromNow,
                $lt: fourDaysFromNow
            }
        }).populate('user')

        if (customers.length > 0) {
            console.log('Found customers with subscription ending in 3 days:', customers.length)
            return customers
        } else {
            console.log('No subscriptions ending in 3 days')
            return []
        }
    } catch (error) {
        console.error('Error in getSubscriptionEndDate:', error)
        return []
    }
}

module.exports = getSubscriptionEndDate