import { CreateRestaurantDTO } from '../../external/dtos/create-restaurant.dto';
import { ListAllRestaurantDTO } from '../../external/dtos/list-all-restaurant.dto';

export interface IRestaurantRepository {
  create(props: CreateRestaurantDTO): Promise<void>;
  findByEmail(email: string): Promise<Restaurant.LoginOutput>;
  findAll(): Promise<ListAllRestaurantDTO[]>;
}


export namespace Restaurant {
  export type LoginOutput = {
    id: string,
    name: string,
    email: string,
    password: string
  }
}