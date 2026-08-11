import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async processPayment(orderId: string, amount: string): Promise<void> {
    console.log(`[Payment] Processing payment for order ${orderId}: ${amount}`);

    // Simulamos procesamiento externo
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`[Payment] Payment successful for order ${orderId}`);
    // throw new Error('Payment provider unavailable');
  }
}
