import { Module } from '@nestjs/common';

import { OrdersModule } from '../orders/orders.module';

import { OrderCreatedListener } from './order-created.listener';
import { PaymentFailedListener } from './payment-failed.listener';
import { PaymentSucceededListener } from './payment-succeeded.listener';

@Module({
  imports: [OrdersModule],
  providers: [
    OrderCreatedListener,
    PaymentFailedListener,
    PaymentSucceededListener,
  ],
})
export class EventsModule {}
