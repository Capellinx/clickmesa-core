import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { EnvService } from 'src/env/env.service';

@Module({
  imports: [],
  providers: [JwtStrategy, EnvService],
  exports: [JwtStrategy],
})
export class AuthModule {}
