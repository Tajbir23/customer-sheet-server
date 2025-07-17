const cron = require('node-cron');
const Customer = require('../model/customersSchema');
const getReminderDate = require('./getReminderDate');

// Example cron job that runs every day at midnight to check for inactive customers
const checkInactiveCustomers = cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running daily check for inactive customers...');
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        
        const inactiveCustomers = await Customer.find({
            lastActivity: { $lt: thirtyDaysAgo }
        });

        console.log(`Found ${inactiveCustomers.length} inactive customers`);
        // You can add your business logic here, like sending notifications
        // or updating customer status
        
    } catch (error) {
        console.error('Error in inactive customers cron job:', error);
    }
}, {
    scheduled: true,
    timezone: "UTC"
});

// Cron job that runs every day at midnight to check for reminders
const checkReminders = cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Checking for today\'s reminders...');
        const customersWithReminders = await getReminderDate();
        
        if (customersWithReminders.length > 0) {
            customersWithReminders.forEach(customer => {
                console.log(`Reminder for customer: ${customer.customerName}`);
                console.log(`Email: ${customer.email}`);
                console.log(`Reminder Note: ${customer.reminderNote}`);
                console.log(`Subscription End: ${customer.subscriptionEnd}`);
                console.log('-------------------');
                
                // Here you can add notification logic
                // For example: sending emails, SMS, or other notifications
            });
        }
    } catch (error) {
        console.error('Error in reminder check cron job:', error);
    }
}, {
    scheduled: true,
    timezone: "UTC"
});

// Example cron job that runs every hour to perform data cleanup
const dataCleanup = cron.schedule('0 * * * *', async () => {
    try {
        console.log('Running hourly data cleanup...');
        // Add your cleanup logic here
        
    } catch (error) {
        console.error('Error in data cleanup cron job:', error);
    }
}, {
    scheduled: true,
    timezone: "UTC"
});

// Export the cron jobs so they can be started/stopped from other files
module.exports = {
    checkInactiveCustomers,
    checkReminders,
    dataCleanup
}; 