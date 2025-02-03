import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPasswordService } from 'src/modules/services/password.service';
import { LoginRestaurantDTO } from '../infra/dtos/login-restaurant.dto';
import { IRestaurantRepository } from '../domain/repositories/restaurant.repository';
import { ITokenService } from 'src/modules/services/token.service';

@Injectable()
export class LoginRestaurantUseCase {
  constructor(
    @Inject('IRestaurantRepository')
    private readonly restaurantRepository: IRestaurantRepository,

    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,

    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
  ) {}

  async execute({
    email,
    password,
  }: LoginRestaurantDTO): Promise<Login.Output> {
    const restaurant = await this.restaurantRepository.findByEmail(email);

    if (!restaurant) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Email ou senha incorretos',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = await this.passwordService.compare(
      password,
      restaurant.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Email ou senha incorretos',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const access_token = this.tokenService.generateToken({
      id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      role: restaurant.role,
      first_login: restaurant.first_login,
    });

    return {
      message: 'login efetuado com sucesso!',
      statusCode: HttpStatus.OK,
      access_token,
    };
  }
}

namespace Login {
  export type Output = {
    statusCode: number;
    message: string;
    access_token: string;
  };
}
