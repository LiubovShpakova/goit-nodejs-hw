/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
const Mailgen = require('mailgen');
require('dotenv').config();


class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000';
        break;
      case 'production':
        this.link = 'link for production';
        break;
      default:
        this.link = 'http://localhost:3000';
        break;
    }
  };

  createTemplateVerifyEmail(verifyToken) {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: 'LSCompany',
        link: this.link,
        // Optional product logo
        logo: 'https://static.cdn.entryscape.com/assets/entryscape.png',
      },
    });
    const email = {
      body: {
        name: 'Friend',
        intro:
          'Welcome to LSCompany! We\'re very excited to have you on board.',
        action: {
          instructions: 'To get started with LSCompany, please click here:',
          button: {
            color: '#29bac2', // Optional action button color
            text: 'Verify your account',
            link: `${this.link}/api/users/auth/verify/${verifyToken}`,
          },
        },
      },
    };

    const emailBody = mailGenerator.generate(email);
    return emailBody;
  };

  async sendVerifyEmail(verifyToken, email) {
    const emailHtml = this.createTemplateVerifyEmail(verifyToken);
    const msg = {
      to: email, // Change to your recipient
      subject: 'Verify email',
      html: emailHtml,
    };
    const result = await this.sender.send(msg);
    console.log('EmailService -> sendVerifyEmail -> result', result);
  }
};

module.exports = EmailService;

