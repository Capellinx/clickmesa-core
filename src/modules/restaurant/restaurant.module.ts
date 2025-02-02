import { Module } from '@nestjs/common';
import { CreateRestaurantUseCase } from './internal/use-cases/create-restaurant.use-case';
import { RestaurantController } from './external/controllers/restaurant.controller';
import { PrismaRestaurantRepository } from './infra/prisma.repository';
import { PrismaService } from 'prisma/prisma.service';
import { BcryptService } from '../services/implementations/bcrypt.service';

@Module({
  controllers: [RestaurantController],
  providers: [
    PrismaService,
    CreateRestaurantUseCase,
    BcryptService,
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
