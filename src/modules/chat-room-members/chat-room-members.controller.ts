import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Query, UseInterceptors } from '@nestjs/common';
import { GetUser } from '@src/common/decorators';
import { User } from '../users/entities/user.entity';
import { CreateChatRoomMemberDto } from './dtos/create-chat-room-member.dto';
import { CHAT_ROOM_MEMBERS_SERVICE } from './constants/tokens.constant';
import { IChatRoomMembersService } from './interfaces/chat-room-members-service.interface';
import { ApiCreateChatRoomMember } from './docs/create-chat-room-member.doc';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { ApiGetChatRoomMemberList } from './docs/get-chat-room-member-list.doc';
import { TransformInterceptor } from '@src/common/interceptors';

@UseInterceptors(TransformInterceptor)
@ApiTags('Chat_Room_Members')
@Controller('chat_room_members')
export class ChatRoomMembersController {
  constructor(@Inject(CHAT_ROOM_MEMBERS_SERVICE) private readonly chatRoomMembersService: IChatRoomMembersService) {}

  @ApiCreateChatRoomMember()
  @Post(':chat_room_id')
  public createChatRoomMember(
    @Param('chat_room_id', ParseUUIDPipe) chatRoomId: string,
    @Body() createChatRoomMemberDto: CreateChatRoomMemberDto,
    @GetUser() user: User,
  ) {
    return this.chatRoomMembersService.createChatRoomMember(chatRoomId, createChatRoomMemberDto, user);
  }

  @ApiGetChatRoomMemberList()
  @Get(':chat_room_id')
  getMembersFromChatRoom(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('chat_room_id', ParseUUIDPipe) chatRoomId: string,
  ) {
    return this.chatRoomMembersService.getMembersFromChatRoom(chatRoomId, pageOptionsDto);
  }
}
