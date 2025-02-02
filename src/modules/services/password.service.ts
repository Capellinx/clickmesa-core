export interface IPasswordService {
  compare(password: string, hash: string): Promise<boolean>;
  hash(password: string): Promise<string>;
}
