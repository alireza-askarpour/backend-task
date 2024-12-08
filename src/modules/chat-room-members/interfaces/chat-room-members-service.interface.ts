import { HttpStatus } from '@nestjs/common';
import { User } from '@src/modules/users/entities/user.entity';
import { CreateChatRoomMemberDto } from '../dtos/create-chat-room-member.dto';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { PageDto } from '@src/common/dtos/page.dto';
import { ChatRoomMember } from '../entities/chat-room-member.entity';

export interface IChatRoomMembersService {
  createChatRoomMember(
    chatRoomId: string,
    createChatRoomMemberDto: CreateChatRoomMemberDto,
    user: User,
  ): Promise<{ statusCode: HttpStatus; message: string }>;
  getMembersFromChatRoom(chatRoomId: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<ChatRoomMember>>;
}
