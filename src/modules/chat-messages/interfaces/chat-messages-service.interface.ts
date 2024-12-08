import { Socket } from 'socket.io';
import { CreateChatMessageDto } from '../dtos/create-chat-message.dto';

export interface IChatMessagesService {
  createChatMessage(payload: CreateChatMessageDto, socket: Socket): any;
  findSocketByUserIdAndJoinToRoom(userId: string, chatRoomId: string): Promise<void>;
  findSocketByUserIdAndLaveFromRoom(userId: string, chatRoomId: string): Promise<void>;
}
