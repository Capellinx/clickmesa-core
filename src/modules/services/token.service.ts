export interface ITokenService {
  generateToken(id: Record<string, any>): string;
  generateRefreshToken(id: Record<string, any>): string;
}
