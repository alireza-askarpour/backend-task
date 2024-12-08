import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomMember } from './entities/chat-room-member.entity';
import { CreateChatRoomMemberInput } from './interfaces/create-chat-room-member-input.interface';
import { IChatRoomMembersRepository } from './interfaces/chat-room-members-repository.interface';

export default class ChatRoomMembersRepository implements IChatRoomMembersRepository {
  constructor(@InjectRepository(ChatRoomMember) private readonly chatRoomMember: Repository<ChatRoomMember>) {}

  public create(data: CreateChatRoomMemberInput): Promise<ChatRoomMember> {
    const newChatRoomMember = this.chatRoomMember.create({
      chat_room_id: data.chat_room_id,
      user_id: data.user_id,
      invite_id: null,
      role: data.role,
    });
    return this.chatRoomMember.save(newChatRoomMember);
  }

  public findByChatRoomAndUserId(chatRoomId: string, userId: string): Promise<ChatRoomMember> {
    return this.chatRoomMember.findOne({ where: { chat_room_id: chatRoomId, user_id: userId } });
  }

  public createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<ChatRoomMember> {
    return this.chatRoomMember.createQueryBuilder(alias, queryRunner);
  }
}
