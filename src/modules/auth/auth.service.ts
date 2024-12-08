import { Injectable, ConflictException, BadRequestException, Inject } from '@nestjs/common';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';
import { USERS_REPOSITORY } from '../users/interfaces/tokens';
import { IUsersRepository } from '@src/modules/users/interfaces';
import { JWT_SERVICE } from '@src/libs/jwt/constants';
import { IJwtService, IRefreshToken } from '@src/libs/jwt/interfaces';
import { IAuthService } from './interfaces';
import { TokenTypeEnum } from '@src/libs/jwt/enums/token-type.enum';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepository: IUsersRepository,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
  ) {}

  public async signup(signupDto: SignupDto): Promise<{ accessToken: string; refreshToken: string }> {
    const duplicatedEmail = await this.usersRepository.findByEmail(signupDto.email);

    if (duplicatedEmail) {
      throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXIST);
    }

    const user = await this.usersRepository.create({
      email: signupDto.email,
      full_name: signupDto.full_name,
      password_hash: signupDto.password,
    });

    const [accessToken, refreshToken] = await this.jwtService.generateAuthTokens(user);

    return { accessToken, refreshToken };
  }

  public async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException(ResponseMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const isMatch: boolean = await user.comparePassword(loginDto.password);

    if (!isMatch) {
      throw new BadRequestException(ResponseMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const [accessToken, refreshToken] = await this.jwtService.generateAuthTokens(user);

    return { accessToken, refreshToken };
  }

  public async refreshToken(
    refreshToken: string,
    domain?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = await this.jwtService.verifyToken<IRefreshToken>(refreshToken, TokenTypeEnum.REFRESH);
    const user = await this.usersRepository.findByUserId(payload.user_id);

    const [accessToken, newRefreshToken] = await this.jwtService.generateAuthTokens(user, domain, payload.tokenId);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
