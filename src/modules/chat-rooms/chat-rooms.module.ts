import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { ChatRoomsController } from './chat-rooms.controller';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomsRepository } from './chat-rooms.repository';
import { CHAT_ROOMS_REPOSITORY, CHAT_ROOMS_SERVICE } from './interfaces';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomsController],
  providers: [
    {
      provide: CHAT_ROOMS_SERVICE,
      useClass: ChatRoomsService,
    },
    {
      provide: CHAT_ROOMS_REPOSITORY,
      useClass: ChatRoomsRepository,
    },
  ],
})
export class ChatRoomsModule {}
