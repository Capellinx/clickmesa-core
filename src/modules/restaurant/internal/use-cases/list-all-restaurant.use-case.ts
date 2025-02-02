import { Inject, Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../../domain/repositories/restaurant.repository';

@Injectable()
export class ListAllRestaurantUseCase {
  constructor(
    @Inject('IRestaurantRepository')
    private readonly restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(): Promise<any> {
    return await this.restaurantRepository.findAll();
  }
}
