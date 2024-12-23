import { Injectable } from '@nestjs/common';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';


interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'YOUR_GMAIL',
                pass: 'YOUR_PASSWORD',
            }
        });
    }
    async sendMemberJoinVerification(emailAddress: string, signupVerifyToekn: string) {
        const baseUrl = 'http://localhost:3000';
        console.log('signupVerifyToekn: ', signupVerifyToekn);
        console.log('email: ', emailAddress);
        const url = `${baseUrl}/users/email-verify?signupVerifyToekn=${signupVerifyToekn}`;
        console.log(url);
        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `
                가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
                <form action="${url} method="POST">
                  <button>가입확인</button>
                </form>
            `
        }
        return await this.transporter.sendMail(mailOptions);
    }
}
