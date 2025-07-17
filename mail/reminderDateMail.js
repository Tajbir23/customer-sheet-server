const reminderDateMail = async(customerName, customerEmail, customerContact, gptAccount, reminderNote) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reminder for ${customerName}</h2>
            
            <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
                <p><strong>Customer Name:</strong> ${customerName}</p>
                <p><strong>Customer Email:</strong> ${customerEmail}</p>
                <p><strong>Contact Info:</strong> ${customerContact}</p>
                <p><strong>GPT Account:</strong> ${gptAccount}</p>
                <p><strong>Reminder Note:</strong> ${reminderNote}</p>
            </div>
        </div>
    `;

    return html;
}

module.exports = reminderDateMail