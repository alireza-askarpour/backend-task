import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IChatRoomMembersService } from './interfaces/chat-room-members-service.interface';
import { CreateChatRoomMemberDto } from './dtos/create-chat-room-member.dto';
import { User } from '../users/entities/user.entity';
import { CHAT_ROOM_MEMBERS_REPOSITORY } from './constants/tokens.constant';
import { IChatRoomMembersRepository } from './interfaces/chat-room-members-repository.interface';
import { ChatRoomMember, ChatRoomMemberRole } from './entities/chat-room-member.entity';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';
import { CHAT_MESSAGES_SERVICE } from '../chat-messages/constants';
import { IChatMessagesService } from '../chat-messages/interfaces';
import { CHAT_EMIT } from '../chat-messages/constants/tokens';
import { IChatEmit } from '../chat-messages/interfaces/chat-emit.interface';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { PageMetaDto } from '@src/common/dtos/page-meta.dto';
import { PageDto } from '@src/common/dtos/page.dto';

@Injectable()
export class ChatRoomMembersService implements IChatRoomMembersService {
  constructor(
    @Inject(CHAT_ROOM_MEMBERS_REPOSITORY) private readonly chatRoomMembersRepository: IChatRoomMembersRepository,
    @Inject(CHAT_MESSAGES_SERVICE) private readonly chatMessagesService: IChatMessagesService,
    @Inject(CHAT_EMIT) private readonly chatEmit: IChatEmit,
  ) {}

  public async createChatRoomMember(
    chatRoomId: string,
    createChatRoomMemberDto: CreateChatRoomMemberDto,
    user: User,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    // check is valid invite_id

    // check already has member
    const hasMember = await this.chatRoomMembersRepository.findByChatRoomAndUserId(chatRoomId, user.user_id);
    if (hasMember) {
      throw new BadRequestException(ResponseMessages.MEMBER_EXISTS);
    }

    const chatRoomMember: ChatRoomMember = await this.chatRoomMembersRepository.create({
      chat_room_id: chatRoomId,
      user_id: user.user_id,
      role: ChatRoomMemberRole.USER,
    });

    await this.chatMessagesService.findSocketByUserIdAndJoinToRoom(user.user_id, chatRoomId);

    this.chatEmit.joinMember(chatRoomId, chatRoomMember);

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.MEMBER_JOINED_TO_CHAT_ROOM,
    };
  }

  public async getMembersFromChatRoom(
    chatRoomId: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChatRoomMember>> {
    const queryBuilder = this.chatRoomMembersRepository.createQueryBuilder('chat_room_members');

    queryBuilder
      .leftJoinAndSelect('chat_room_members.user', 'user')
      .leftJoinAndSelect('chat_room_members.chatRoom', 'chatRoom')
      .orderBy('chat_room_members.created_at', pageOptionsDto.order)
      .where('chat_room_members.chat_room_id = :chatRoomId', { chatRoomId })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    queryBuilder.select([
      'chat_room_members.chat_room_member_id',
      'chat_room_members.role',
      'chat_room_members.created_at',
      'chat_room_members.updated_at',
      'user.user_id',
      'user.email',
      'user.full_name',
      'user.avatar_url',
      'user.created_at',
      'user.updated_at',
      'chatRoom.chat_room_id',
      'chatRoom.owner_id',
      'chatRoom.title',
      'chatRoom.created_at',
      'chatRoom.updated_at',
    ]);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
