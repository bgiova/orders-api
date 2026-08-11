import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentFailedEvent } from './payment-failed.event';
import { OrdersRepository } from '../orders/orders.repository';

@Injectable()
export class PaymentFailedListener {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  @OnEvent('payment.failed')
  async handle(event: PaymentFailedEvent): Promise<void> {
    const updated = await this.ordersRepository.markAsFailed(event.orderId);

    if (updated) {
      console.log(`[Order] ${event.orderId} marked as FAILED: ${event.reason}`);
    }
  }
}
