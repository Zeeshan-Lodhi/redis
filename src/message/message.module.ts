import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioController } from './message.controller';
import { MessageConsumer } from './message.processor';
import { MessageProducerService } from './message.producer.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'message',
    }),
  ],
  controllers: [AudioController],
  providers: [MessageProducerService, MessageConsumer],
})
export class AudioModule {}
