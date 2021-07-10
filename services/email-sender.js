/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER,
      },
      tls: {
        rejectUnauthorized: false
      }
    };
    const transporter = nodemailer.createTransport(smtpTransport(config));
    return await transporter.sendMail({
      ...msg,
      from: process.env.EMAIL_NODEMAILER,
    });
  }
};

module.exports = {CreateSenderNodemailer};

/*
const nodemailer = require('nodemailer');
require('dotenv').config();

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({
      ...msg,
      from: process.env.EMAIL_NODEMAILER,
    });
  }
};

module.exports = {CreateSenderNodemailer};

*/