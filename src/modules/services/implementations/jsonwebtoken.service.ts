import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../token.service';
import { EnvService } from 'src/env/env.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JsonWebTokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {}

  generateToken(payload: Record<string, any>): string {
    const token = this.jwtService.sign(payload, {
      secret: this.envService.get('JWT_SECRET'),
      expiresIn: '1d',
    });

    return token;
  }

  generateRefreshToken(payload: Record<string, any>): string {
    const token = this.jwtService.sign(payload, {
      secret: this.envService.get('JWT_SECRET'),
      expiresIn: '1d',
    });

    return token;
  }
}
