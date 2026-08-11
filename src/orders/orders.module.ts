import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrderCreatedPublisher } from '../events/order-created.publisher';
import { BullModule } from '@nestjs/bullmq';
import { OrdersProcessor } from './orders.processor';
import { PaymentService } from '../payments/payment.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    OrderCreatedPublisher,
    OrdersProcessor,
    PaymentService,
  ],
  exports: [OrdersRepository],
})
export class OrdersModule {}
