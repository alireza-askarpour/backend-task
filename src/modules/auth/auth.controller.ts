import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Inject, Post, Req, UseInterceptors } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { TransformInterceptor } from '@src/common/interceptors/transform.interceptor';
import { ApiSignup } from './docs/signup.doc';
import { LoginDto } from './dtos/login.dto';
import { ApiLogin } from './docs/login.doc';
import { Public } from '@src/common/decorators';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ApiRefreshToken } from './docs/refresh-token.doc';
import { AUTH_SERVICE } from './interfaces/tokens';
import { IAuthService } from './interfaces/auth-service.interface';
import { ILoggerService, LOGGER_SERVICE } from '../logger/interfaces';

@ApiTags('Auth')
@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
  ) {}

  @Public()
  @ApiSignup()
  @Post('signup')
  public signup(@Body() signupDto: SignupDto): Promise<{ accessToken: string; refreshToken: string }> {
    this.logger.log('Called signup', AuthController.name);
    return this.authService.signup(signupDto);
  }

  @Public()
  @ApiLogin()
  @Post('login')
  public login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    this.logger.log('Called login', AuthController.name);
    return this.authService.login(loginDto);
  }

  @Public()
  @ApiRefreshToken()
  @Post('refresh-token')
  public refreshToken(
    @Body() { refresh_token }: RefreshTokenDto,
    @Req() req: Request,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    this.logger.log('Called refresh token', AuthController.name);
    return this.authService.refreshToken(refresh_token, req.headers.origin);
  }
}
