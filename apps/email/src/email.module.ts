import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { SMTP_TRANSPORTER } from './constants';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

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
    EmailService,
  ],
  controllers: [EmailController],
})
export class EmailModule {}
