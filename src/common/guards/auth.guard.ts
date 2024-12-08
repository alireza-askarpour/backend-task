import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { isJWT } from 'class-validator';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from '@src/common/decorators';
import { isNull, isUndefined } from '@src/common/utils/validation.util';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';
import { USERS_REPOSITORY } from '@src/modules/users/interfaces/tokens';
import { IUsersRepository } from '@src/modules/users/interfaces/users-repository.interface';
import { JWT_SERVICE } from '@src/libs/jwt/constants';
import { IJwtService } from '@src/libs/jwt/interfaces';
import { TokenTypeEnum } from '@src/libs/jwt/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(USERS_REPOSITORY) private readonly usersRepository: IUsersRepository,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const activate = await this.setHttpHeader(context.switchToHttp().getRequest<Request>(), isPublic);
    if (!activate) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }

    return activate;
  }

  private async setHttpHeader(req: Request, isPublic: boolean): Promise<boolean> {
    const auth = req.headers?.authorization;

    if (isUndefined(auth) || isNull(auth) || auth.length === 0) {
      return isPublic;
    }
    const authArr = auth.split(' ');
    const bearer = authArr[0];
    const token = authArr[1];

    if (isUndefined(bearer) || isNull(bearer) || bearer !== 'Bearer') {
      return isPublic;
    }
    if (isUndefined(token) || isNull(token) || !isJWT(token)) {
      return isPublic;
    }

    try {
      const { user_id } = await this.jwtService.verifyToken(token, TokenTypeEnum.ACCESS);

      const user = await this.usersRepository.findByUserId(user_id);
      if (!user) {
        throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
      }

      req.user = user;
      return true;
    } catch (_) {
      return isPublic;
    }
  }
}
