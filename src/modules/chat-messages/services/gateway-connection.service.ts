import { Socket } from 'socket.io';
import { isJWT } from 'class-validator';
import { Injectable, Inject } from '@nestjs/common';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';
import { WsBadRequestException, WsUnauthorizedException } from '@src/common/exceptions/ws-exceptions';
import { SocketKeys } from '../constants/socket.keys';
import { IUsersRepository, USERS_REPOSITORY } from '@src/modules/users/interfaces';
import { TokenTypeEnum } from '@src/libs/jwt/enums';
import { JWT_SERVICE } from '@src/libs/jwt/constants';
import { IJwtService } from '@src/libs/jwt/interfaces';
import { isNull, isUndefined } from '@src/common/utils/validation.util';
import { UserSocketManager } from '../user-socket.manager';
import { ILoggerService, LOGGER_SERVICE } from '@src/modules/logger/interfaces';

@Injectable()
export class GatewayConnectionService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(USERS_REPOSITORY) private readonly usersRepository: IUsersRepository,
    private readonly userSocketManager: UserSocketManager,
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    try {
      const authorization: string | undefined = client.handshake.headers['authorization'];

      await this.handleAuthentication(client, authorization);
    } catch (err) {
      this.disconnect(client, err);
    }
  }

  private async handleAuthentication(client: Socket, authorization: string): Promise<void> {
    const token: string = this.extractToken(authorization);

    const { user_id } = await this.jwtService.verifyToken(token, TokenTypeEnum.ACCESS);
    const user = await this.usersRepository.findByUserId(user_id);

    if (!user) {
      throw new WsUnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }

    client.data.userId = user.user_id;
    this.connectedClients.set(client.id, client);

    client.on('disconnect', () => {
      this.connectedClients.delete(client.id);
    });
  }

  private extractToken(authorization: string): string {
    const authArr = authorization?.split(' ');
    const bearer = authArr[0];
    const token = authArr[1];

    if (isUndefined(bearer) || isNull(bearer) || bearer !== 'Bearer') {
      throw new WsUnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }

    if (isUndefined(token) || isNull(token) || !isJWT(token)) {
      throw new WsUnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }

    return token;
  }

  private disconnect(socket: Socket, error: any): void {
    const err = {
      message: error.message,
      type: error.type,
    };

    socket.emit(SocketKeys.EXCEPTION, err);
    socket.disconnect();
    socket.rooms.clear();
  }

  private async handleEnforceSingleDeviceConnection(userId: string, client: any): Promise<void> {
    const userSocket = await this.userSocketManager.findOneSocketByUserId(userId);

    if (userSocket) {
      this.disconnect(client, new WsBadRequestException(ResponseMessages.ONLY_ONE_DEVICE_ALLOWED));
    }
  }
}
