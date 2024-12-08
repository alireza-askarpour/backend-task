import { v4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { JwtService as _JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException, InternalServerErrorException, Inject } from '@nestjs/common';
import { IAccessToken, IAccessPayload } from './interfaces/access-token.interface';
import { IRefreshToken, IRefreshPayload } from './interfaces/refresh-token.interface';
import { TokenTypeEnum } from './enums/token-type.enum';
import { IJwt } from './interfaces/jwt.interface';
import { IEmailToken } from './interfaces/email-token.interface';
import { User } from '@src/modules/users/entities/user.entity';
import { IJwtService } from './interfaces/jwt-service.interface';
import { IJwtServiceConfig } from './interfaces/jwt-service-config.interface';
import { COMMON_SERVICE } from '@src/modules/common/common.module';
import { ICommonService } from '@src/modules/common/common-service.interface';

@Injectable()
export class JwtService implements IJwtService, IJwtServiceConfig {
  constructor(
    @Inject('JWT_CONFIG') private readonly _jwtConfig: IJwt,
    @Inject('ISSUER') private readonly issuer: string,
    @Inject('DOMAIN') private readonly domain: string,
    @Inject(COMMON_SERVICE) private readonly commonService: ICommonService,
  ) {}

  async generateTokenAsync(
    payload: IAccessPayload | IRefreshPayload,
    secret: string,
    options: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, rejects) => {
      jwt.sign(payload, secret, options, (error, token) => {
        if (error) {
          rejects(error);
          return;
        }
        resolve(token);
      });
    });
  }

  async verifyTokenAsync<T>(token: string, secret: string, options: jwt.VerifyOptions): Promise<T> {
    return new Promise((resolve, rejects) => {
      jwt.verify(token, secret, options, (error, payload: T) => {
        if (error) {
          rejects(error);
          return;
        }
        resolve(payload);
      });
    });
  }

  async throwBadRequest<T extends IAccessToken | IRefreshToken | IEmailToken>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new BadRequestException('Token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new BadRequestException('Invalid token');
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async generateToken(
    user: User,
    tokenType: TokenTypeEnum,
    domain?: string | null,
    tokenId?: string,
  ): Promise<any> {
    const jwtOptions: jwt.SignOptions = {
      issuer: this.issuer,
      subject: user.user_id,
      audience: domain ?? this.domain,
      algorithm: 'HS256',
    };

    switch (tokenType) {
      case TokenTypeEnum.ACCESS:
        const { private_key, time: accessTime } = this._jwtConfig.access;
        return this.commonService.throwInternalError(
          this.generateTokenAsync({ user_id: user.user_id }, private_key, {
            ...jwtOptions,
            expiresIn: accessTime,
            algorithm: 'RS256',
          }),
        );
      case TokenTypeEnum.REFRESH:
        const { secret: refreshSecret, time: refreshTime } = this._jwtConfig.refresh;
        return this.commonService.throwInternalError(
          this.generateTokenAsync(
            {
              user_id: user.user_id,
              tokenId: tokenId ?? v4(),
            },
            refreshSecret,
            {
              ...jwtOptions,
              expiresIn: refreshTime,
            },
          ),
        );
      case TokenTypeEnum.CONFIRMATION:
      case TokenTypeEnum.RESET_PASSWORD:
        const { secret, time } = this._jwtConfig[tokenType];
        return this.commonService.throwInternalError(
          this.generateTokenAsync({ user_id: user.user_id }, secret, {
            ...jwtOptions,
            expiresIn: time,
          }),
        );
    }
  }

  public async verifyToken<T extends IAccessToken | IRefreshToken>(
    token: string,
    tokenType: TokenTypeEnum,
  ): Promise<T> {
    const jwtOptions: jwt.VerifyOptions = {
      issuer: this.issuer,
      audience: new RegExp(this.domain),
    };

    switch (tokenType) {
      case TokenTypeEnum.ACCESS:
        const { public_key, time: accessTime } = this._jwtConfig.access;
        return this.throwBadRequest(
          this.verifyTokenAsync(token, public_key, {
            ...jwtOptions,
            maxAge: accessTime,
            algorithms: ['RS256'],
          }),
        );
      case TokenTypeEnum.REFRESH:
      case TokenTypeEnum.CONFIRMATION:
      case TokenTypeEnum.RESET_PASSWORD:
        const { secret, time } = this._jwtConfig[tokenType];
        return this.throwBadRequest(
          this.verifyTokenAsync(token, secret, {
            ...jwtOptions,
            maxAge: time,
            algorithms: ['HS256'],
          }),
        );
    }
  }
  public async generateAuthTokens(user: User, domain?: string, tokenId?: string): Promise<[string, string]> {
    return Promise.all([
      this.generateToken(user, TokenTypeEnum.ACCESS, domain, tokenId),
      this.generateToken(user, TokenTypeEnum.REFRESH, domain, tokenId),
    ]);
  }
}