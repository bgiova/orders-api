import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

import { OrderCreatedSubscriber } from './events/order-created.subscriber';
import { AppService } from './app.service';
import { OrderCreatedListener } from './events/order-created.listener';
import { PaymentFailedListener } from './events/payment-failed.listener';
import { PaymentSucceededListener } from './events/payment-succeeded.listener';

@Module({
  imports: [
    OrdersModule,
    PrismaModule,
    EventEmitterModule.forRoot(),
    RedisModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    OrderCreatedListener,
    OrderCreatedSubscriber,
    PaymentFailedListener,
    PaymentSucceededListener,
  ],
})
export class AppModule {}
