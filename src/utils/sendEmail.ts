import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (fromName:string, sendName:string, email: string, link: string) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: process.env.SENDGRID_API_KEY, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'studenthubpersonal@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Portfolio Invitation', // Subject line
    text: 'Hello world?', // plain text body
    html: `Hi <b>${sendName}</b>, <br/>
            You are invited to see <b>${fromName}</b> portfolio page by clicking this following link!<br/><br/>          
            <a href="${link}">${link}</a>
            
            <br/><br/>
            
            Thank you
          
            `, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
