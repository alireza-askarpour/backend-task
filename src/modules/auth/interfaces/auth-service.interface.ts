import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/signup.dto';

export interface IAuthService {
  signup(signupDto: SignupDto): Promise<{ accessToken: string; refreshToken: string }>;
  login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }>;
  refreshToken(refreshToken: string, domain?: string): Promise<{ accessToken: string; refreshToken: string }>;
}
