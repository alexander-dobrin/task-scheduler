import { UserTasksStatistics } from '@app/common/types';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('user_registered')
  handleUserRegistered(@Payload() data, @Ctx() context: RmqContext) {
    return this.emailService.sendWellcomeMail(data.email, context);
  }

  @EventPattern('send_out_task_statistics')
  handleSendOutTaskStatistics(
    @Payload() statistics: UserTasksStatistics,
    @Ctx() context: RmqContext,
  ) {
    return this.emailService.sendTaskStatistics(statistics, context);
  }
}
