import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { CreateChatRoomInput, IChatRoomsRepository } from './interfaces';

export class ChatRoomsRepository implements IChatRoomsRepository {
  constructor(@InjectRepository(ChatRoom) private chatRoomEntity: Repository<ChatRoom>) {}

  public findByChatRoomId(chatRoomId: string, select?: (keyof any)[]): Promise<ChatRoom> {
    return this.chatRoomEntity.findOne({ where: { chat_room_id: chatRoomId }, select: [], relations: ['owner'] });
  }

  public create(chatRoom: CreateChatRoomInput): Promise<ChatRoom> {
    const newChatRoom = this.chatRoomEntity.create({
      title: chatRoom.title,
      owner_id: chatRoom.owner_id,
    });
    return this.chatRoomEntity.save(newChatRoom);
  }

  public createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<ChatRoom> {
    return this.chatRoomEntity.createQueryBuilder(alias, queryRunner);
  }
}
