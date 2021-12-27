const nodemailer = require('nodemailer');

const send = async({mail, subject = 'Confirmación de correo', body}) => {
    try{
    const transporter = nodemailer.createTransport({
        service : process.env.MAIL_SERVICE,
        auth : {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
    const info = {
        to: mail,
        subject: subject,
        html: body
    };
    const {messageId} = await transporter.sendMail(info);
    return messageId;
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {send};