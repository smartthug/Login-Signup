import 'dotenv/config';
import nodemailer from 'nodemailer';

// Transporter for Mailtrap
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  }
});

// Function to send OTP
const sendVerificationEmail = async (email, generate_otp, name) => {
  try {
    const emailTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
            margin: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #deae7d;
          }
          .otp {
            background-color: #123458;
            padding: 15px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 5px;
            text-align: center;
            background-color: #82FFBC;
            letter-spacing: 2px;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #7f8c8d;
            text-align: center;
          }
          .footer a {
            color: #3498db;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>OTP Verification for ${name}</h1>
          <p>Hi ${name},</p>
          <p>Here is your One-Time Password (OTP) for verification:</p>
          <div class="otp">
            ${generate_otp}
          </div>
          <p>This OTP is valid for 30 minutes.</p>
          <div class="footer">
            <p>If you did not request this, please ignore this email.</p>
            <p>&copy; 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transport.sendMail({
      from: 'rahuldeva5555@gmail.com',
      to: email,
      subject: 'OTP Verification',
      html: emailTemplate,
    });

    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    throw new Error('Email not sent, try again later.');
  }
};

// Welcome home email
const sendWelcome = async (email, name) => {
  try {
    const welcomepage = `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
      }
      .email-container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      }
      .header {
        background-color: #123458;
        padding: 20px;
        text-align: center;
        color: white;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        color: #333;
      }
      .content h2 {
        color: #deae7d;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #777;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #123458;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 90% !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Welcome to Our Community!</h1>
      </div>
      <div class="content">
        <h2>Hello ${name},</h2>
        <p>We're thrilled to have you on board! 🎉</p>
        <p>
          Thank you for joining us. We are excited to help you get started and make the most of our platform.
        </p>
        <p>
          If you have any questions, feel free to reach out. We're here to support you!
        </p>
        <a href="#" class="btn">Get Started</a>
      </div>
      <div class="footer">
        &copy; 2025 Your Company. All rights reserved.<br />
        This is an automated message. Please do not reply.
      </div>
    </div>
  </body>
</html>
  `;
    const info = await transport.sendMail({
      from: 'rahuldeva5555@gmail.com',
      to: email,
      subject: 'Welcome Page',
      html: welcomepage,
    });

    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send welcome page email:', error);
    throw new Error('Email not sent, try again later.');
  }
};

const sendRestPasswordEmail = async (email, tokenurl) => {
  try {
    const reset = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
    <style>
      body {
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
        padding: 0;
        margin: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      }
      .header {
        background-color: #123458;
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
        color: #333;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #123458;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        font-size: 12px;
        text-align: center;
        color: #999;
        margin-top: 30px;
      }
        a{
        color:#ffffff;
        text-decoration:none;
        }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>We received a request to reset your password.</p>
        <p>Click the button below to set a new password:</p>
        <a href="${tokenurl}" class="btn">Reset Password</a>
        <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
      </div>
      <div class="footer">
        &copy; 2025 Your Company. All rights reserved.
      </div>
    </div>
  </body>
</html>
    `;
    const info = await transport.sendMail({
      from: 'rahuldeva5555@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: reset,
    });

    console.log(`Reset password email sent to: ${email}`);
    return info;
  } catch (error) {
    console.error('Failed to send reset password email:', error);
    throw new Error('Email not sent, try again later.');
  }
};

const sendReset = async (email) => {
  const resetsucess = `  
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Password Reset Successful</title>
        <style>
          body {
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
            padding: 0;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .header {
            background-color: #123458;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
            color: #333;
          }
          .footer {
            font-size: 12px;
            text-align: center;
            color: #999;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Successful</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Your password has been successfully reset. You can now log in using your new password.</p>
            <p>If you did not perform this action, please contact our support team immediately.</p>
          </div>
          <div class="footer">
            &copy; 2025 Your Company. All rights reserved.
          </div>
        </div>
      </body>
    </html>
    `;
  try {
    const info = await transport.sendMail({
      from: 'rahuldeva5555@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: resetsucess
    });

    console.log(`Reset password email sent to: ${email}`);
    return info;
  } catch (error) {
    console.error('Failed to send reset password email:', error);
    throw new Error('Email not sent, try again later.');
  }
};

export { sendVerificationEmail, sendWelcome, sendRestPasswordEmail, sendReset };
