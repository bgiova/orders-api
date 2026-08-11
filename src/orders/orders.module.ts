import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { OrderCreatedPublisher } from '../events/order-created.publisher';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.registerQueue({
      name: 'orders',
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrderCreatedPublisher],
  exports: [OrdersRepository],
})
export class OrdersModule {}
