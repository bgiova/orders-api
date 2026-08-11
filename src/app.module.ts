import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

import { OrderCreatedSubscriber } from './events/order-created.subscriber';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    OrdersModule,
    PrismaModule,
    EventEmitterModule.forRoot(),
    RedisModule,
    EventsModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OrderCreatedSubscriber],
})
export class AppModule {}
