import {
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit, UseFilters, UsePipes, ValidationPipe, Inject } from '@nestjs/common';
import { WsCatchAllFilter } from '@src/common/exceptions/ws-catch-all-filter';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ILoggerService, LOGGER_SERVICE } from '../logger/interfaces';
import { CHAT_MESSAGES_SERVICE, GATEWAY_CONNECTION_SERVICE, SocketKeys } from './constants';
import { IChatMessagesService } from './interfaces';
import { IGatewayConnectionService } from './interfaces/gateway-connection-service.interface';
import { CreateChatMessageDto } from './dtos/create-chat-message.dto';

const corsOptions: CorsOptions = {
  origin: '*',
  allowedHeaders: ['Authorization'],
};

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway(81, {
  cors: corsOptions,
})
export class ChatMessagesGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
    @Inject(GATEWAY_CONNECTION_SERVICE) private connectionService: IGatewayConnectionService,
    @Inject(CHAT_MESSAGES_SERVICE) private readonly chatMessagesService: IChatMessagesService,
  ) {}

  async handleConnection(socket: Socket) {
    console.log(`Connected with socket id ${socket.id}`);
    await this.connectionService.handleConnection(socket);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`${socket.id} disconnected!`, ChatMessagesGateway.name);
  }

  onModuleInit() {
    this.server.on('connection', socket => {
      console.log(`Connected ${socket.id}`, ChatMessagesGateway.name);
    });
  }

  @SubscribeMessage(SocketKeys.SEND_MESSAGE)
  async onCreateChatMessage(@MessageBody() payload: CreateChatMessageDto, @ConnectedSocket() socket: Socket) {
    return await this.chatMessagesService.createChatMessage(payload, socket);
  }
}
