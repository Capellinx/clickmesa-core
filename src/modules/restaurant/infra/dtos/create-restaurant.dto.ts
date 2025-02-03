export class CreateRestaurantDTO {
  name: string;
  password: string;
  email: string;
  description?: string;
  cnpj: string;
  owner_restaurant: string;
}
