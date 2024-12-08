import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomMember } from './entities/chat-room-member.entity';
import ChatRoomMembersRepository from './chat-room-members.repository';
import { CHAT_ROOM_MEMBERS_REPOSITORY, CHAT_ROOM_MEMBERS_SERVICE } from './constants/tokens.constant';
import { ChatRoomMembersService } from './chat-room-members.service';
import { ChatMessagesModule } from '../chat-messages/chat-messages.module';
import { ChatRoomMembersController } from './chat-room-members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomMember]), ChatMessagesModule],
  controllers: [ChatRoomMembersController],
  providers: [
    {
      provide: CHAT_ROOM_MEMBERS_REPOSITORY,
      useClass: ChatRoomMembersRepository,
    },
    {
      provide: CHAT_ROOM_MEMBERS_SERVICE,
      useClass: ChatRoomMembersService,
    },
  ],
  exports: [CHAT_ROOM_MEMBERS_REPOSITORY, CHAT_ROOM_MEMBERS_SERVICE],
})
export class ChatRoomMembersModule {}
