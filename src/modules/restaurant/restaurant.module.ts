import { Module } from '@nestjs/common';
import { CreateRestaurantUseCase } from './internal/use-cases/create-restaurant.use-case';
import { RestaurantController } from './external/controllers/restaurant.controller';
import { PrismaRestaurantRepository } from './external/infra/prisma.repository';
import { PrismaService } from 'prisma/prisma.service';
import { BcryptService } from '../services/implementations/bcrypt.service';
import { ListAllRestaurantUseCase } from './internal/use-cases/list-all-restaurant.use-case';
import { NodemailerService } from '../services/implementations/nodemailer.service';
import { SendEmailWelcomeUseCase } from './internal/use-cases/send-email-welcome.use-case';

@Module({
  controllers: [RestaurantController],
  providers: [
    PrismaService,
    BcryptService,
    NodemailerService,
    CreateRestaurantUseCase,  
    SendEmailWelcomeUseCase,
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
    {
      provide: 'IEmailService',
      useExisting: NodemailerService,
    },
  ],
})
export class RestaurantModule {}
