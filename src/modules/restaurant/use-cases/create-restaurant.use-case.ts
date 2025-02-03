import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPasswordService } from 'src/modules/services/password.service';
import { SendEmailWelcomeUseCase } from './send-email-welcome.use-case';
import { IRestaurantRepository } from '../domain/repositories/restaurant.repository';
import { CreateRestaurantDTO } from '../infra/dtos/create-restaurant.dto';
import { Restaurant } from '../domain/entities/restaurant.entity';

@Injectable()
export class CreateRestaurantUseCase {
  constructor(
    @Inject('IRestaurantRepository')
    private readonly restaurantRepository: IRestaurantRepository,

    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,

    private readonly sendEmailWelcomeUseCase: SendEmailWelcomeUseCase,
  ) {}

  async execute({
    name,
    email,
    description,
    cnpj,
    owner_restaurant,
  }: CreateRestaurantDTO): Promise<void> {
    const verifyEmail = await this.restaurantRepository.findByEmail(email);

    if (verifyEmail) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Email já cadastrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newRestaurant = new Restaurant({
      name,
      email,
      description,
      cnpj,
      owner_restaurant,
    });

    const password = newRestaurant.createPassword();
    const hashedPassword = await this.passwordService.hash(password);

    newRestaurant.updatePassword(hashedPassword);

    await this.restaurantRepository.create({
      name: newRestaurant.name,
      password: newRestaurant.password,
      email: newRestaurant.email,
      description: newRestaurant.description ?? 'Não informado',
      cnpj: newRestaurant.cnpj,
      owner_restaurant: newRestaurant.ownerRestaurant,
    });

    await this.sendEmailWelcomeUseCase.execute({
      email: newRestaurant.email,
      name: newRestaurant.name,
      password,
    });

    return;
  }
}
