import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateRestaurantDTO } from '../dtos/create-restaurant.dto';
import { CreateRestaurantUseCase } from '../../internal/use-cases/create-restaurant.use-case';
import { ListAllRestaurantUseCase } from '../../internal/use-cases/list-all-restaurant.use-case';
import { LoginRestaurantDTO } from '../dtos/login-restaurant.dto';
import { LoginRestaurantUseCase } from '../../internal/use-cases/login-restaurant.use-case';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly createRestaurantUseCase: CreateRestaurantUseCase,
    private readonly listAllRestaurantUseCase: ListAllRestaurantUseCase,
    private readonly loginRestaurantUseCase: LoginRestaurantUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createRestaurantDTO: CreateRestaurantDTO) {
    return this.createRestaurantUseCase.execute(createRestaurantDTO);
  }

  @Post("/login")
  @HttpCode(200)
  login(@Body() loginRestaurantDTO: LoginRestaurantDTO) {
    return this.loginRestaurantUseCase.execute(loginRestaurantDTO)
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.listAllRestaurantUseCase.execute();
  }
}
