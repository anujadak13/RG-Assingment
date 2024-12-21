import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  //'youremail@gmail.com',   //'myfriend@yahoo.com',
        to,                            
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (err) {
        console.error('Error sending email:', err.message);
    }
}

export {
    sendEmail
}
