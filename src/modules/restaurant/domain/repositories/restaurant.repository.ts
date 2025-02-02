import { IRestaurantProps } from "../entities/restaurant.entity";

export interface IRestaurantRepository {
   create(props: IRestaurantProps): Promise<void>;
}