const subscriptionEndMail = async(customerName, customerEmail, customerContact, gptAccount, note) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Customer Subscription Ending Today</h2>
            
            <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
                <p><strong>Customer Name:</strong> ${customerName}</p>
                <p><strong>Customer Email:</strong> ${customerEmail}</p>
                <p><strong>Contact Info:</strong> ${customerContact}</p>
                <p><strong>GPT Account:</strong> ${gptAccount}</p>
                ${note ? `<p><strong>Note:</strong> ${note}</p>` : ''}
            </div>

            <p>This customer's subscription is ending today. Please follow up for renewal.</p>
            
            <p style="color: #666; font-size: 12px;">
                This is an automated notification from your customer management system.
            </p>
        </div>
    `;

    return html;
}

module.exports = subscriptionEndMail