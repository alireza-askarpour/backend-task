import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { CreateChatRoomDto } from '../dtos/create-chat-room.dto';
import { ChatRoom } from '../entities/chat-room.entity';
import { PageDto } from '@src/common/dtos/page.dto';
import { User } from '@src/modules/users/entities/user.entity';

export interface IChatRoomsService {
  createChatRoom(user: User, createChatRoomDto: CreateChatRoomDto): Promise<{ chat_room: ChatRoom }>;
  getChatRoomList(ownerId: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<ChatRoom>>;
}
