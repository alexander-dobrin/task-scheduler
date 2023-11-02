import { UserTasksStatistics } from '@app/common/types';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MailerService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('user_registered')
  handleUserRegistered(@Payload() data, @Ctx() context: RmqContext) {
    return this.mailerService.sendWellcomeMail(data.email, context);
  }

  @EventPattern('send_out_task_statistics')
  handleSendOutTaskStatistics(
    @Payload() statistics: UserTasksStatistics,
    @Ctx() context: RmqContext,
  ) {
    return this.mailerService.sendTaskStatistics(statistics, context);
  }
}
