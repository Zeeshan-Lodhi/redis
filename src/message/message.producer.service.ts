import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';

@Controller('v1/file')
export class MessageProducerService {
  constructor(@InjectQueue('message') private readonly messageQueue: Queue) {}

  async sendMsg(msg: string) {
    await this.messageQueue.add('message-job', {
      text: msg,
    });
  }
}
