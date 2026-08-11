import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrdersRepository } from '../orders/orders.repository';
import { PaymentSucceededEvent } from './payment-succeeded.event';

@Injectable()
export class PaymentSucceededListener {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  @OnEvent('payment.succeeded')
  async handle(event: PaymentSucceededEvent): Promise<void> {
    await this.ordersRepository.updateStatus(event.orderId, 'PAID');

    console.log(`[Order] ${event.orderId} marked as PAID`);
  }
}
