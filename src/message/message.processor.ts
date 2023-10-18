import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';

@Processor('message')
export class MessageConsumer {
  @Process('message-job')
  readOperationJob(job: Job) {
    console.log(job.data);
  }
}
