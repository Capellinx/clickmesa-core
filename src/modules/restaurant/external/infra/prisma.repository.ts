import { Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRestaurantDTO } from '../dtos/create-restaurant.dto';

@Injectable()
export class PrismaRestaurantRepository implements IRestaurantRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(props: CreateRestaurantDTO): Promise<void> {
    await this.prismaService.restaurant.create({
      data: {
        name: props.name,
        password: props.password,
        email: props.email,
        description: props.description,
        cnpj: props.cnpj,
        ownerRestauant: props.owner_restaurant,
        status: 'ATIVO',
      },
    });
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
