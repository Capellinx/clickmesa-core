import { Module } from '@nestjs/common';
import { EnvService } from 'src/env/env.service';
import { JwtService } from '@nestjs/jwt';
import { NodemailerService } from './implementations/nodemailer.service';
import { BcryptService } from './implementations/bcrypt.service';
import { JsonWebTokenService } from './implementations/jsonwebtoken.service';

@Module({
  providers: [
    EnvService,
    JwtService,
    JsonWebTokenService,
    NodemailerService,
    BcryptService,
  ],
  exports: [EnvService, JsonWebTokenService, NodemailerService, BcryptService],
})
export class ServicesModule {}
