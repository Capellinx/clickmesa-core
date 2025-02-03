import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { RestaurantController } from '../restaurant/infra/controllers/restaurant.controller';
import { PrismaRestaurantRepository } from '../restaurant/infra/repositories/prisma.repository';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { CreateRestaurantUseCase } from '../restaurant/use-cases/create-restaurant.use-case';
import { ListAllRestaurantUseCase } from '../restaurant/use-cases/list-all-restaurant.use-case';
import { LoginRestaurantUseCase } from '../restaurant/use-cases/login-restaurant.use-case';
import { SendEmailWelcomeUseCase } from '../restaurant/use-cases/send-email-welcome.use-case';
import { BcryptService } from '../services/implementations/bcrypt.service';
import { JsonWebTokenService } from '../services/implementations/jsonwebtoken.service';
import { NodemailerService } from '../services/implementations/nodemailer.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: async (envService: EnvService) => {
        return {
          secret: envService.get("JWT_SECRET"),
          signOptions: {
            expiresIn: "1d",
          },
        }
      }
    }),
    RestaurantModule,
    EnvModule,
  ],
  providers: [
    EnvService,
    JwtStrategy,
    PrismaService,
    LoginRestaurantUseCase,
    CreateRestaurantUseCase,
    SendEmailWelcomeUseCase,
    ListAllRestaurantUseCase,
    PrismaRestaurantRepository,
    BcryptService,
    NodemailerService,
    JsonWebTokenService,
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
  exports: [
    PassportModule,
    JwtModule
  ],
  controllers: [RestaurantController],
})
export class AuthModule { }
