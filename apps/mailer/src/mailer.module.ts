import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { SMTP_TRANSPORTER } from './constants';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

dotenv.config();

@Module({
  providers: [
    {
      provide: SMTP_TRANSPORTER,
      useValue: nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      }),
    },
    MailerService,
  ],
  controllers: [MailerController],
})
export class MailerModule {}
