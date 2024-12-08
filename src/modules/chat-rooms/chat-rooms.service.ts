import { Inject, Injectable } from '@nestjs/common';
import { ChatRoom } from './entities/chat-room.entity';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { CreateChatRoomDto } from './dtos/create-chat-room.dto';
import { PageMetaDto } from '@src/common/dtos/page-meta.dto';
import { PageDto } from '@src/common/dtos/page.dto';
import { CHAT_ROOMS_REPOSITORY } from './interfaces/tokens';
import { IChatRoomsRepository, IChatRoomsService } from './interfaces';
import { excludeObjectKeys } from '@src/common/utils/exclude_object_keys.util';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatRoomsService implements IChatRoomsService {
  constructor(@Inject(CHAT_ROOMS_REPOSITORY) private readonly chatRoomsRepository: IChatRoomsRepository) {}

  public async createChatRoom(user: User, createChatRoomDto: CreateChatRoomDto): Promise<{ chat_room: ChatRoom }> {
    // Create a record chat room in database
    const createdChatRoom = await this.chatRoomsRepository.create({
      title: createChatRoomDto.title,
      owner_id: user.user_id,
    });

    const owner = excludeObjectKeys(user, 'password_hash');
    const chatRoom = excludeObjectKeys(createdChatRoom, 'owner_id');
    chatRoom.owner = owner;

    return {
      chat_room: chatRoom,
    };
  }

  public async getChatRoomList(ownerId: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<ChatRoom>> {
    const queryBuilder = this.chatRoomsRepository.createQueryBuilder('chat_rooms');
    queryBuilder
      .leftJoinAndSelect('chat_rooms.owner', 'owner')
      .orderBy('chat_rooms.created_at', pageOptionsDto.order)
      .where('chat_rooms.owner_id = :ownerId', { ownerId })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .select([
        'chat_rooms.chat_room_id',
        'chat_rooms.title',
        'chat_rooms.created_at',
        'chat_rooms.updated_at',
        'owner.user_id',
        'owner.email',
        'owner.full_name',
        'owner.avatar_url',
        'owner.created_at',
        'owner.updated_at',
      ]);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
