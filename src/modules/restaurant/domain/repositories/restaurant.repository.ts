import { Role } from '@prisma/client';
import { CreateRestaurantDTO } from '../../infra/dtos/create-restaurant.dto';
import { ListAllRestaurantDTO } from '../../infra/dtos/list-all-restaurant.dto';

export interface IRestaurantRepository {
  create(props: CreateRestaurantDTO): Promise<void>;
  findByEmail(email: string): Promise<Restaurant.LoginOutput>;
  findAll(): Promise<ListAllRestaurantDTO[]>;
}

export namespace Restaurant {
  export type LoginOutput = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
  };
}
