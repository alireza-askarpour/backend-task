import { Get, Body, Post, Query, Inject, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@src/common/interceptors';
import { GetUser } from '@src/common/decorators';
import { ApiCreateChatRoom } from './docs/create-chat-room.doc';
import { CreateChatRoomDto } from './dtos/create-chat-room.dto';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { PageDto } from '@src/common/dtos/page.dto';
import { ChatRoom } from './entities/chat-room.entity';
import { ApiGetChatRoomList } from './docs/get-chat-room-list.doc';
import { CHAT_ROOMS_SERVICE, IChatRoomsService } from './interfaces';
import { ILoggerService, LOGGER_SERVICE } from '../logger/interfaces';
import { User } from '../users/entities/user.entity';

@ApiTags('Chat_Rooms')
@UseInterceptors(TransformInterceptor)
@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
    @Inject(CHAT_ROOMS_SERVICE) private readonly chatRoomsService: IChatRoomsService,
  ) {}

  @ApiCreateChatRoom()
  @Post()
  public createChatRoom(
    @GetUser() user: User,
    @Body() createChatRoomDto: CreateChatRoomDto,
  ): Promise<{ chat_room: ChatRoom }> {
    this.logger.log('Called create chat room', ChatRoomsController.name);
    return this.chatRoomsService.createChatRoom(user, createChatRoomDto);
  }

  @ApiGetChatRoomList()
  @Get()
  public getChatRoomList(
    @GetUser('user_id') userId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChatRoom>> {
    this.logger.log('Called get chat room list', ChatRoomsController.name);
    return this.chatRoomsService.getChatRoomList(userId, pageOptionsDto);
  }
}
