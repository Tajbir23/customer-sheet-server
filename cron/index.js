const cron = require('node-cron');
const getReminderDate = require('./getReminderDate');
const getSubscriptionEndDate = require('./getSubscriptionEndDate');
const mail = require('../mail/mail');
const reminderDateMail = require('../mail/reminderDateMail');
const subscriptionEndMail = require('../mail/subscriptionEndMail');


// Cron job that runs every day at midnight to check for reminders
const checkReminders = cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Checking for today\'s reminders...');
        const customersWithReminders = await getReminderDate();
        
        if (customersWithReminders.length > 0) {
            customersWithReminders.forEach(customer => {
                const customerName = customer.customerName
                const customerEmail = customer.email
                const customerContact = customer.waOrFbId
                const gptAccount = customer.gptAccount
                const reminderNote = customer.reminderNote
                const adminEmail = customer.user.email
                const sendMail = async() => {
                    const body = await reminderDateMail(customerName, customerEmail, customerContact, gptAccount, reminderNote)
                    await mail(adminEmail, body, 'Reminder for Subscription')
                }
                sendMail()
                console.log(`Reminder for customer: ${customer.customerName}`);
                console.log(`Created By User: ${customer.user.name}`); // User info
                console.log(`User Email: ${customer.user.email}`); // User info
                console.log(`Customer Email: ${customer.email}`);
                console.log(`Order From: ${customer.orderFrom}`);
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

// Cron job that runs every day at midnight to check for subscription end dates
const checkSubscriptionEnd = cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Checking for subscriptions ending in 3 days...');
        const customersWithEndingSubscriptions = await getSubscriptionEndDate();
        
        if (customersWithEndingSubscriptions.length > 0) {
            customersWithEndingSubscriptions.forEach(customer => {
                const customerName = customer.customerName
                const customerEmail = customer.email
                const customerContact = customer.waOrFbId
                const gptAccount = customer.gptAccount
                const note = customer.note
                const adminEmail = customer.user.email

                const sendMail = async() => {
                    const body = await subscriptionEndMail(customerName, customerEmail, customerContact, gptAccount, note)
                    await mail(adminEmail, body, 'Subscription Ending in 3 Days')
                }
                sendMail()
                console.log(`Subscription ending in 3 days for customer: ${customer.customerName}`);
                console.log(`Created By User: ${customer.user.name}`); // User info
                console.log(`User Email: ${customer.user.email}`); // User info
                console.log(`Customer Email: ${customer.email}`);
                console.log(`Order From: ${customer.orderFrom}`);
                console.log(`GPT Account: ${customer.gptAccount}`);
                console.log(`Payment Status: ${customer.paymentStatus}`);
                console.log(`Last Paid Amount: ${customer.paidAmount}`);
                console.log(`Payment Method: ${customer.paymentMethod}`);
                console.log(`WhatsApp/Facebook ID: ${customer.waOrFbId}`);
                console.log('-------------------');
                
                // Here you can add notification logic
                // For example: sending emails, SMS, or other notifications
            });
        }
    } catch (error) {
        console.error('Error in subscription check cron job:', error);
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
    checkReminders,
    checkSubscriptionEnd,
    dataCleanup
}; 