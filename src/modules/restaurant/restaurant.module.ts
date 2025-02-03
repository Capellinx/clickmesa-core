import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { BcryptService } from '../services/implementations/bcrypt.service';
import { NodemailerService } from '../services/implementations/nodemailer.service';
import { RestaurantController } from './infra/controllers/restaurant.controller';
import { PrismaRestaurantRepository } from './infra/repositories/prisma.repository';
import { CreateRestaurantUseCase } from './use-cases/create-restaurant.use-case';
import { ListAllRestaurantUseCase } from './use-cases/list-all-restaurant.use-case';
import { LoginRestaurantUseCase } from './use-cases/login-restaurant.use-case';
import { SendEmailWelcomeUseCase } from './use-cases/send-email-welcome.use-case';
import { JsonWebTokenService } from '../services/implementations/jsonwebtoken.service';
import { ServicesModule } from '../services/services.module';

@Module({
  controllers: [RestaurantController],
  providers: [
    PrismaService,
    BcryptService,
    JwtService,
    JsonWebTokenService,
    NodemailerService,
    LoginRestaurantUseCase,
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
    {
      provide: 'ITokenService',
      useExisting: JsonWebTokenService,
    },
  ],
  imports: [ServicesModule],
})
export class RestaurantModule {}
