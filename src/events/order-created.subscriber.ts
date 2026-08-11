import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class OrderCreatedSubscriber implements OnModuleInit {
  private readonly subscriber: Redis;

  constructor() {
    this.subscriber = new Redis(
      process.env.REDIS_URL ?? 'redis://localhost:6379',
    );
  }

  async onModuleInit() {
    await this.subscriber.subscribe('order.created');

    console.log('[Redis] subscribed to order.created');

    this.subscriber.on('message', (channel, message) => {
      console.log(`[Redis] ${channel}: ${message}`);
    });
  }
}
