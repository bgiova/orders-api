import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { EventsModule } from '../events/events.module';
import { OrdersModule } from '../orders/orders.module';
import { OrdersProcessor } from '../orders/orders.processor';
import { PaymentService } from '../payments/payment.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    PrismaModule,
    EventsModule,
    OrdersModule,
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'orders',
    }),
  ],
  providers: [OrdersProcessor, PaymentService],
})
export class WorkerModule {}
