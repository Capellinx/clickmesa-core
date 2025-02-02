import { Module } from '@nestjs/common';
import { CreateRestaurantUseCase } from './internal/use-cases/create-restaurant.use-case';
import { RestaurantController } from './external/controllers/restaurant.controller';
import { PrismaRestaurantRepository } from './external/infra/prisma.repository';
import { PrismaService } from 'prisma/prisma.service';
import { BcryptService } from '../services/implementations/bcrypt.service';
import { ListAllRestaurantUseCase } from './internal/use-cases/list-all-restaurant.use-case';

@Module({
  controllers: [RestaurantController],
  providers: [
    PrismaService,
    BcryptService,
    CreateRestaurantUseCase,
    ListAllRestaurantUseCase,
    PrismaRestaurantRepository,
    {
      provide: 'IRestaurantRepository',
      useExisting: PrismaRestaurantRepository,
    },
    {
      provide: 'IPasswordService',
      useExisting: BcryptService,
    },
  ],
})
export class RestaurantModule {}
