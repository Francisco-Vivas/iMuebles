const { sendEmail } = require('../configs/nodemailer')


exports.sendMensajito = async(req, res) => {
    const { name, email, subject, message } = req.body
    await sendEmail(name, email, subject, message)
    res.render('message', { email, subject, message })
}