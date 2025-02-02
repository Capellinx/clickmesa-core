// src/infra/prisma.repository.ts

import { Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../domain/repositories/restaurant.repository';
import { IRestaurantProps } from '../domain/entities/restaurant.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PrismaRestaurantRepository implements IRestaurantRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(props: IRestaurantProps): Promise<void> {
    console.log(props);
  }

  async findByEmail(email: string): Promise<boolean> {
    const isExistEmail = await this.prismaService.restaurant.findFirst({
      where: {
        email,
      },
    });

    if (!isExistEmail) return false;

    return true;
  }
}
