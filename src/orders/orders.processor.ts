import { Processor, WorkerHost } from '@nestjs/bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';

import { PaymentService } from '../payments/payment.service';
import { PaymentSucceededEvent } from '../events/payment-succeeded.event';
import { PaymentFailedEvent } from '../events/payment-failed.event';

interface OrderCreatedJobData {
  orderId: string;
  customerId: string;
  total: string;
}

@Processor('orders')
export class OrdersProcessor extends WorkerHost {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super();
  }

  async process(job: Job<OrderCreatedJobData>): Promise<void> {
    const { orderId, total } = job.data;

    console.log(
      `[Worker] Processing order ${orderId} (attempt ${job.attemptsMade + 1})`,
    );

    try {
      await this.paymentService.processPayment(orderId, total);

      this.eventEmitter.emit(
        'payment.succeeded',
        new PaymentSucceededEvent(orderId),
      );
    } catch (error) {
      const maxAttempts = job.opts.attempts ?? 1;
      const currentAttempt = job.attemptsMade + 1;
      const isLastAttempt = currentAttempt >= maxAttempts;

      if (isLastAttempt) {
        this.eventEmitter.emit(
          'payment.failed',
          new PaymentFailedEvent(
            orderId,
            error instanceof Error ? error.message : 'Unknown error',
          ),
        );
      }

      throw error;
    }
  }
}
