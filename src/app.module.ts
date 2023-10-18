import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';
import { DatabaseModule } from './config/db.module';
import { PostModule } from './post/post.module';
import { CacheModule } from '@nestjs/cache-manager';
// import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bull';
import { AudioModule } from './message/message.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   isGlobal: true,
    //   host: 'localhost',
    //   port: 6379,
    // }),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    DatabaseModule,
    AudioModule,
    // PostModule,
  ],
})
export class AppModule {}
