const customersModel = require("../model/customersSchema")

const getReminderDate = async() => {
    try {
        // Get current date and set time to midnight for comparison
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        // Get tomorrow's date
        const tomorrowDate = new Date(currentDate)
        tomorrowDate.setDate(currentDate.getDate() + 1)

        // Find customers whose reminder date is between today midnight and tomorrow midnight
        // and populate the user data
        const customers = await customersModel.find({
            reminderDate: {
                $gte: currentDate,
                $lt: tomorrowDate
            }
        }).populate('user')

        if (customers.length > 0) {
            console.log('Found customers with reminders for today:', customers.length)
            return customers
        } else {
            console.log('No reminders for today')
            return []
        }
    } catch (error) {
        console.error('Error in getReminderDate:', error)
        return []
    }
}

module.exports = getReminderDate