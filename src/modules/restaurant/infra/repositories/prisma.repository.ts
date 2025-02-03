import { Injectable } from '@nestjs/common';
import {
  IRestaurantRepository,
  Restaurant,
} from '../../domain/repositories/restaurant.repository';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRestaurantDTO } from '../dtos/create-restaurant.dto';
import { ListAllRestaurantDTO } from '../dtos/list-all-restaurant.dto';

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
        status: 'PENDING',
      },
    });
  }

  async findByEmail(email: string): Promise<Restaurant.LoginOutput> {
    const isExistEmail = await this.prismaService.restaurant.findFirst({
      where: {
        email,
      },
    });

    if (!isExistEmail) return null;

    return {
      id: isExistEmail.id,
      name: isExistEmail.name,
      email: isExistEmail.email,
      password: isExistEmail.password,
      role: isExistEmail.role,
      first_login: isExistEmail.first_login,
    };
  }

  async findAll(): Promise<ListAllRestaurantDTO[]> {
    const restaurantsFromDb = await this.prismaService.restaurant.findMany({
      select: {
        cnpj: true,
        createdAt: true,
        description: true,
        email: true,
        id: true,
        name: true,
        ownerRestauant: true,
        status: true,
      },
    });

    if (!restaurantsFromDb) return [];

    return restaurantsFromDb.map((restaurant) => {
      return {
        id: restaurant.id,
        name: restaurant.name,
        cnpj: restaurant.cnpj,
        email: restaurant.email,
        status: restaurant.status,
        description: restaurant.description,
        owner_restaurant: restaurant.ownerRestauant,
        createdAt: restaurant.createdAt,
      };
    });
  }
}
