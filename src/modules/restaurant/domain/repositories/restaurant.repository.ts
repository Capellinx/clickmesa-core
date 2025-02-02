import { CreateRestaurantDTO } from '../../external/dtos/create-restaurant.dto';

export interface IRestaurantRepository {
  create(props: CreateRestaurantDTO): Promise<void>;
  findByEmail(email: string): Promise<boolean>;
}
