export class CreateRestaurantDTO {
  name: string;
  password: string;
  email: string;
  description?: string;
  cnpj: number;
  owner_restaurant: string;
}
