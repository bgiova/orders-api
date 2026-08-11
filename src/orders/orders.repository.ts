import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { OrderStatus } from '../../generated/prisma/client';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.OrderCreateInput) {
    return this.prisma.order.create({ data });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }

  async markAsFailed(orderId: string): Promise<boolean> {
    const result = await this.prisma.order.updateMany({
      where: {
        id: orderId,
        status: {
          not: 'FAILED',
        },
      },
      data: {
        status: 'FAILED',
      },
    });

    return result.count > 0;
  }
}
