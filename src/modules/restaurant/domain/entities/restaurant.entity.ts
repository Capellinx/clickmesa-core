import { randomUUID as uuid } from 'crypto';

export interface IRestaurantProps {
  id?: string;
  name: string;
  password?: string;
  email: string;
  description: string;
  cnpj: string;
  owner_restaurant: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Restaurant {
  private readonly _id: string;
  private _name: string;
  private _password: string;
  private _email: string;
  private _description: string;
  private _cnpj: string;
  private _ownerRestaurant: string;
  private _status: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({ ...props }: IRestaurantProps) {
    this._id = props.id ?? uuid();
    this._name = props.name;
    this._password = props.password;
    this._email = props.email;
    this._description = props.description;
    this._cnpj = props.cnpj;
    this._ownerRestaurant = props.owner_restaurant;
    this._status = props.status;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  static create(props: IRestaurantProps) {
    if (!props.email.includes('@')) throw new Error('Email inválido');

    return new Restaurant(props);
  }

  createPassword = () => {
    return Math.random().toString(36).slice(2);
  };

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  get email(): string {
    return this._email;
  }

  get description(): string {
    return this._description;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  get ownerRestaurant(): string {
    return this._ownerRestaurant;
  }

  get status(): string {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateName(name: string) {
    this._name = name;
  }

  updateDescription(description: string) {
    this._description = description;
  }

  updateStatus(status: string) {
    this._status = status;
  }

  updatePassword(hashedPassword: string) {
    this._password = hashedPassword;
  }
}
