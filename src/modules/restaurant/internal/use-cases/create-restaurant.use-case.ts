// src/internal/use-cases/create-restaurant.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { CreateRestaurantDTO } from '../../external/dtos/create-restaurant.dto';
import { Restaurant } from '../../domain/entities/restaurant.entity';

@Injectable()
export class CreateRestaurantUseCase {
  constructor(
    @Inject('IRestaurantRepository')
    private readonly prismaService: IRestaurantRepository,
  ) {}

  async execute(props: CreateRestaurantDTO): Promise<void> {
    const verifyEmail = await this.prismaService.findByEmail(props.email);

    if (verifyEmail) throw new Error('Email ja cadastrado');

    const newRestaurant = new Restaurant({
      name: props.name,
      password: props.password,
      email: props.email,
      description: props.description,
      cnpj: props.cnpj,
      owner_restaurant: props.owner_restaurant,
    });

    console.log(newRestaurant);
  }
}
