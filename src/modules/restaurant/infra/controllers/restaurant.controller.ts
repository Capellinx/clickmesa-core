import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { CreateRestaurantUseCase } from '../../use-cases/create-restaurant.use-case';
import { ListAllRestaurantUseCase } from '../../use-cases/list-all-restaurant.use-case';
import { LoginRestaurantUseCase } from '../../use-cases/login-restaurant.use-case';
import { CreateRestaurantDTO } from '../dtos/create-restaurant.dto';
import { LoginRestaurantDTO } from '../dtos/login-restaurant.dto';

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

  @Post('/login')
  @HttpCode(200)
  login(@Body() loginRestaurantDTO: LoginRestaurantDTO) {
    return this.loginRestaurantUseCase.execute(loginRestaurantDTO);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  findAll() {
    return this.listAllRestaurantUseCase.execute();
  }
}
