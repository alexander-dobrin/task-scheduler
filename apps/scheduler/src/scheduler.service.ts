import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  @Cron('45 * * * * *')
  getHello() {
    console.log('Hello World!');
  }
}
