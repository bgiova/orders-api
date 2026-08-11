import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class OrderCreatedListener {
  private readonly logger = new Logger(OrderCreatedListener.name);

  @OnEvent('order.created')
  handle(event: OrderCreatedEvent) {
    this.logger.log(
      `Order created: ${event.orderId} - customer: ${event.customerId} - total:  ${event.total.toString()}`,
    );
  }
}
