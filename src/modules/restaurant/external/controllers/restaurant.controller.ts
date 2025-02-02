import { Body, Controller, Post } from '@nestjs/common';
import { CreateRestaurantDTO } from '../dtos/create-restaurant.dto';
import { CreateRestaurantUseCase } from '../../internal/use-cases/create-restaurant.use-case';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly createRestaurantUseCase: CreateRestaurantUseCase,
  ) {}

  @Post()
  create(@Body() createRestaurantDTO: CreateRestaurantDTO) {
    return this.createRestaurantUseCase.execute(createRestaurantDTO);
  }
}
