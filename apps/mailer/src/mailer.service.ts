import { UserTasksStatistics } from '@app/common/types';
import { Inject, Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import * as fs from 'fs';
import handlebars from 'handlebars';
import { Transporter } from 'nodemailer';
import * as path from 'path';
import { SMTP_TRANSPORTER } from './constants';

@Injectable()
export class MailerService {
  constructor(
    @Inject(SMTP_TRANSPORTER) private readonly transporter: Transporter,
  ) {}

  async sendWellcomeMail(to: string, context: RmqContext): Promise<void> {
    const template = fs.readFileSync(
      path.join('templates', 'wellcome.hbs'),
      'utf8',
    );

    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate({ to });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: 'No-reply',
      html,
    };

    await this.transporter.sendMail(mailOptions);

    context.getChannelRef().ack(context.getMessage());
  }

  async sendTaskStatistics(
    statistics: UserTasksStatistics,
    context: RmqContext,
  ): Promise<void> {
    const template = fs.readFileSync(
      path.join('templates', 'tasks-statistics.hbs'),
      'utf8',
    );

    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate({
      remainingTasksCount: statistics.remainingTasksCount,
      completedTasksCount: statistics.completedTasksCount,
    });

    // TODO: remove after dto validation
    if (!statistics.email.includes('@')) {
      context.getChannelRef().ack(context.getMessage());
      return;
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: statistics.email,
      subject: 'No-reply',
      html,
    };

    await this.transporter.sendMail(mailOptions);

    context.getChannelRef().ack(context.getMessage());
  }
}
