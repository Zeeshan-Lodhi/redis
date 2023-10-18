import { Controller, Get, Query, Post } from '@nestjs/common';
import { MessageProducerService } from './message.producer.service';

@Controller()
export class AudioController {
  constructor(
    private readonly messageProducerService: MessageProducerService,
  ) {}

  @Get('msg')
  getInvokeMsg(@Query('msg') msg: string) {
    this.messageProducerService.sendMsg(msg);
    return msg;
  }
}
