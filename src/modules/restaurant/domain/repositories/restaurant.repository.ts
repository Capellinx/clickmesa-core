import { CreateRestaurantDTO } from '../../external/dtos/create-restaurant.dto';
import { ListAllRestaurantDTO } from '../../external/dtos/list-all-restaurant.dto';

export interface IRestaurantRepository {
  create(props: CreateRestaurantDTO): Promise<void>;
  findByEmail(email: string): Promise<boolean>;
  findAll(): Promise<ListAllRestaurantDTO[]>;
}
