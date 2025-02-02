import { Module } from '@nestjs/common';
import { CreateRestaurantUseCase } from './internal/use-cases/create-restaurant.use-case';
import { RestaurantController } from './external/controllers/restaurant.controller';
import { PrismaRestaurantRepository } from './infra/prisma.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [RestaurantController],
  providers: [
    PrismaService,
    CreateRestaurantUseCase,
    PrismaRestaurantRepository,
    {
      provide: 'IRestaurantRepository',
      useExisting: PrismaRestaurantRepository,
    },
  ],
})
export class RestaurantModule {}
