import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from 'src/env/env.module'; 
import { EnvService } from 'src/env/env.service';
import { JwtStrategy } from './jwt.strategy';
import { JsonWebTokenService } from '../services/implementations/jsonwebtoken.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [EnvModule], 
      useFactory: async (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [EnvService], 
    }),
  ],
  providers: [
    JwtStrategy,
    JsonWebTokenService,
    EnvService,
    {
      provide: 'ITokenService',
      useExisting: JsonWebTokenService,
    },
  ],
  exports: [JwtModule, PassportModule, JwtStrategy],
})
export class AuthModule { }
