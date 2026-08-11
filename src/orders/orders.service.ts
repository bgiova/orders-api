import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { OrderCreatedEvent } from '../events/order-created.event';
import { OrderCreatedPublisher } from '../events/order-created.publisher';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly orderCreatedPublisher: OrderCreatedPublisher,
  ) {}

  async create(dto: CreateOrderDto) {
    const order = await this.ordersRepository.create({
      customerId: dto.customerId,
      total: dto.total,
    });

    const event = new OrderCreatedEvent(
      order.id,
      order.customerId,
      order.total.toString(),
    );

    this.eventEmitter.emit('order.created', event);

    await this.orderCreatedPublisher.publish(event);

    return order;
  }

  findAll() {
    return this.ordersRepository.findAll();
  }

  findById(id: string) {
    return this.ordersRepository.findById(id);
  }
}
