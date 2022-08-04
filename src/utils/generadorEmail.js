const { EMAIL_ADMIN } = require('../config/globals')
const { CLIENT_ID } = require('../config/globals')
const { CLIENT_SECRET } = require('../config/globals')
const { REFRESH_TOKEN } = require('../config/globals')
const { ACCESS_TOKEN } = require('../config/globals')

//NODEMAILER
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: EMAIL_ADMIN,
        type: 'OAuth2',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        ACCESS_TOKEN: ACCESS_TOKEN
    }
});

async function sendEmail(user) {
    try {
        const info = await transporter.sendMail({
            from: 'Servidor de node.js',
            to: EMAIL_ADMIN,
            subject: 'Nuevo Registro',
            html:
            `<h1 style="color: #5e9ca0;">Registro de usuario:</h1>
            <p>Nombre: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Telefono: ${user.tel}</p>
            <p>Dirección: ${user.address}</p>`
        });
         
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendEmail }
