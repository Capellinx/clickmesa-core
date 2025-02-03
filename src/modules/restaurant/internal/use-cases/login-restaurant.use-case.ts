import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IRestaurantRepository } from "../../domain/repositories/restaurant.repository";
import { LoginRestaurantDTO } from "../../external/dtos/login-restaurant.dto";
import { IPasswordService } from "src/modules/services/password.service";

@Injectable()
export class LoginRestaurantUseCase {
   constructor(
      @Inject('IRestaurantRepository')
      private readonly restaurantRepository: IRestaurantRepository,

      @Inject('IPasswordService')
      private readonly passwordService: IPasswordService
   ) { }

   async execute({ email, password }: LoginRestaurantDTO): Promise<Login.Output> {
      const restaurant = await this.restaurantRepository.findByEmail(email);

      if (!restaurant) {
         throw new HttpException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Email ou senha incorretos'
         },
            HttpStatus.UNAUTHORIZED
         )
      }

      const isValidPassword = await this.passwordService.compare(password, restaurant.password)

      if(!isValidPassword) {
         throw new HttpException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Email ou senha incorretos'
         },
            HttpStatus.UNAUTHORIZED
         )
      }


      return {
         statusCode: HttpStatus.OK,
         access_token: "oaksdoaskd",
         message: "login efetuado com sucesso!",
      }
   }
}

namespace Login {
   export type Output = {
      statusCode: number
      message: string
      access_token: string
   }
}