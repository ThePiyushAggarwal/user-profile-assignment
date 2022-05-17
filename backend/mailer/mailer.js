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
      from: 'Users Profile',
      to: user.email,
      subject: 'Welcome to User Profile',
      html: `
      <div>
        <h2>Welcome to User Profile </h2>
        <br/>
        <a href='https://users-profile-a.herokuapp.com/verifyemail/${hash}' target='_blank' style='padding: 10px; border: 1px solid darkblue; background-color: dodgerblue; color: white; font-size: 20px; border-radius: 3px; text-decoration: none; margin-bottom: 20px;' >Click to verify this email</a><br />
      </div>
      `,
    }

    transporter.sendMail(message, (err, info) => {
      if (err) {
        reject(err)
        console.log(err)
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
