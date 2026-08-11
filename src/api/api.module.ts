import { Module } from '@nestjs/common';

import { OrdersModule } from '../orders/orders.module';
import { EventsModule } from '../events/events.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule, EventsModule, OrdersModule],
})
export class ApiModule {}
