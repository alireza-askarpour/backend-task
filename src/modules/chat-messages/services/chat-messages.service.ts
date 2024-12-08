import { Socket } from 'socket.io';
import { Inject, Injectable } from '@nestjs/common';
import { IChatMessagesRepository, IChatMessagesService } from '../interfaces';
import { CreateChatMessageDto } from '../dtos/create-chat-message.dto';
import { CHAT_MESSAGES_REPOSITORY } from '../constants';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';
import { WsNotFoundException } from '@src/common/exceptions/ws-exceptions';
import { ChatMessage } from '../entities/chat-message.entity';
import { UserSocketManager } from '../user-socket.manager';
import { CHAT_ROOMS_REPOSITORY, IChatRoomsRepository } from '@src/modules/chat-rooms/interfaces';
import { CHAT_EMIT } from '../constants/tokens';
import { IChatEmit } from '../interfaces/chat-emit.interface';

@Injectable()
export class ChatMessagesService implements IChatMessagesService {
  constructor(
    @Inject(CHAT_MESSAGES_REPOSITORY) private readonly chatMessagesRepository: IChatMessagesRepository,
    private readonly userSocketManager: UserSocketManager,
    @Inject(CHAT_ROOMS_REPOSITORY) private readonly chatRoomsRepository: IChatRoomsRepository,
    @Inject(CHAT_EMIT) private readonly chatEmit: IChatEmit,
  ) {}

  public async createChatMessage(payload: CreateChatMessageDto, socket: Socket): Promise<void> {
    const chatRoom = await this.chatRoomsRepository.findByChatRoomId(payload.chat_room_id);
    if (!chatRoom) {
      throw new WsNotFoundException(ResponseMessages.CHAT_ROOM_NOT_FOUND);
    }

    if (payload?.reply_id) {
      const hasReplyMessage = await this.chatMessagesRepository.findById(payload.reply_id);
      if (!hasReplyMessage) throw new WsNotFoundException(ResponseMessages.REPLY_NOT_FOUND);
    }

    console.log('test 1 -> ', {
      chat_room_id: payload.chat_room_id,
      owner_id: socket.data.userId,
      reply_id: payload?.reply_id ?? null,
      content: payload.content,
    });

    const chatMessage: ChatMessage = await this.chatMessagesRepository.create({
      chat_room_id: payload.chat_room_id,
      owner_id: socket.data.userId,
      reply_id: payload?.reply_id,
      content: payload.content,
    });

    await this.findSocketByUserIdAndJoinToRoom(socket.data.userId, payload.chat_room_id);

    this.chatEmit.sendMessage(payload.chat_room_id, chatMessage);
  }

  public async findSocketByUserIdAndJoinToRoom(userId: string, chatRoomId: string): Promise<void> {
    const userSocket = await this.userSocketManager.findOneSocketByUserId(userId);
    console.log({
      userSocket,
      chatRoomId,
    });
    if (userSocket) userSocket.join(chatRoomId);
  }

  public async findSocketByUserIdAndLaveFromRoom(userId: string, chatRoomId: string): Promise<void> {
    const userSocket = await this.userSocketManager.findOneSocketByUserId(userId);
    if (userSocket) userSocket.leave(chatRoomId);
  }
}
