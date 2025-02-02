import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRestaurantDTO } from '../dtos/create-restaurant.dto';
import { CreateRestaurantUseCase } from '../../internal/use-cases/create-restaurant.use-case';
import { ListAllRestaurantUseCase } from '../../internal/use-cases/list-all-restaurant.use-case';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly createRestaurantUseCase: CreateRestaurantUseCase,
    private readonly listAllRestaurantUseCase: ListAllRestaurantUseCase,
  ) {}

  @Post()
  create(@Body() createRestaurantDTO: CreateRestaurantDTO) {
    return this.createRestaurantUseCase.execute(createRestaurantDTO);
  }

  @Get()
  findAll() {
    return this.listAllRestaurantUseCase.execute();
  }
}
