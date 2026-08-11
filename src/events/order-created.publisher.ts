import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class OrderCreatedPublisher {
  constructor(
    @InjectQueue('orders')
    private readonly ordersQueue: Queue,
  ) {}

  async publish(event: OrderCreatedEvent): Promise<void> {
    await this.ordersQueue.add('order.created', event);
  }
}
