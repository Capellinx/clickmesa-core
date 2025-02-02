import * as bcrypt from 'bcrypt';
import { IPasswordService } from '../password.service';

export class BcryptService implements IPasswordService {
  private saltRounds = 6;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
