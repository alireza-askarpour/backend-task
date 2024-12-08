import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { ChatRoomMember } from '../entities/chat-room-member.entity';
import { CreateChatRoomMemberInput } from './create-chat-room-member-input.interface';

export interface IChatRoomMembersRepository {
  create(data: CreateChatRoomMemberInput): Promise<ChatRoomMember>;
  findByChatRoomAndUserId(chatRoomId: string, userId: string): Promise<ChatRoomMember>;
  createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<ChatRoomMember>;
}
