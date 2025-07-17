const nodemailer = require('nodemailer');

const mail = async(emailTo, body, subject) => {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailTo,
            subject: subject,
            html: body
        }
        await transport.sendMail(mailOptions)
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}
module.exports = mail