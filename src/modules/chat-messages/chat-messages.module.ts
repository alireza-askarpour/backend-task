import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatMessagesService } from './services/chat-messages.service';
import { ChatMessagesRepository } from './chat-messages.repository';
import { UsersModule } from '../users/users.module';
import { CHAT_MESSAGES_REPOSITORY, CHAT_MESSAGES_SERVICE } from './constants';
import { GatewayConnectionService } from './services/gateway-connection.service';
import { ChatMessagesGateway } from './chat-messages.gateway';
import { JwtModule } from '@src/libs/jwt';
import { IJwt } from '@src/libs/jwt/interfaces';
import { CHAT_EMIT, GATEWAY_CONNECTION_SERVICE } from './constants/tokens';
import { UserSocketManager } from './user-socket.manager';
import { ChatEmit } from './emits/chat.emit';
import { ChatRoomsModule } from '../chat-rooms/chat-rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessage]),
    JwtModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        jwtConfig: configService.get<IJwt>('jwt'),
        issuer: configService.get<string>('app_id'),
        domain: configService.get<string>('app_domain'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    forwardRef(() => ChatRoomsModule),
  ],
  providers: [
    {
      provide: CHAT_MESSAGES_SERVICE,
      useClass: ChatMessagesService,
    },
    {
      provide: CHAT_MESSAGES_REPOSITORY,
      useClass: ChatMessagesRepository,
    },
    {
      provide: GATEWAY_CONNECTION_SERVICE,
      useClass: GatewayConnectionService,
    },
    {
      provide: CHAT_EMIT,
      useClass: ChatEmit,
    },
    ChatMessagesGateway,
    UserSocketManager,
  ],
  exports: [CHAT_MESSAGES_SERVICE, CHAT_EMIT],
})
export class ChatMessagesModule {}
