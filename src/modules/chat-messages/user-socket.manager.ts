import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ChatMessagesGateway } from './chat-messages.gateway';
import { DefaultEventsMap, RemoteSocket } from 'socket.io';

@Injectable()
export class UserSocketManager {
  constructor(
    @Inject(forwardRef(() => ChatMessagesGateway))
    private chatMessagesGateway: ChatMessagesGateway,
  ) {}

  async findOneSocketByUserId(userId: string): Promise<RemoteSocket<DefaultEventsMap, any>> {
    const sockets = await this.chatMessagesGateway.server.sockets.fetchSockets();
    return sockets.find(socket => socket.data.userId === userId);
  }
}
