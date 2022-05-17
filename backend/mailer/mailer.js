const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

exports.sendConfirmationEmail = (user) => {
  return new Promise(async (result, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })

    const salt = await bcrypt.genSalt(2)
    const hash = (await bcrypt.hash(user.uuid, salt)).replace(/\//g, 'aslash')

    const message = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Its working?',
      html: `
        <h3>hello </h3>
        <a href='http://localhost:5000/api/users/verify/${hash}' target='_blank'>Verify by clicking this link</a>
      `,
    }

    transporter.sendMail(message, (err, info) => {
      if (err) {
        reject(err)
      } else {
        result(info)
      }
    })
  })
}

exports.sendGoogleAcknowledgementEmail = (email) => {
  return new Promise(async (result, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })

    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to User Profile',
      html: `
        <h3>Welcome to User Profile </h3>
        <p>You are registered with us!</p>
      `,
    }

    transporter.sendMail(message, (err, info) => {
      if (err) {
        reject(err)
      } else {
        result(info)
      }
    })
  })
}
