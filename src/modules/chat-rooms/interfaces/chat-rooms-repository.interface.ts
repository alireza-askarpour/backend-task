import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { ChatRoom } from '../entities/chat-room.entity';
import { CreateChatRoomInput } from './create-chat-room-input.interface';

export interface IChatRoomsRepository {
  findByChatRoomId(chatRoomId: string, select?: (keyof any)[]): Promise<ChatRoom>;
  create(chatRoom: CreateChatRoomInput): Promise<ChatRoom>;
  createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<ChatRoom>;
}
