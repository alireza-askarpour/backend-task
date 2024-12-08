import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from '@src/config/index.config';
import { validationSchema } from '@src/config/schema/config.schema';
import { LoggerModule } from '../logger/logger.module';
import { Database } from '@src/config/database/database.module';
import { CommonModule } from '../common/common.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@src/common/guards/auth.guard';
import { ChatRoomsModule } from '../chat-rooms/chat-rooms.module';
import { ChatMessagesModule } from '../chat-messages/chat-messages.module';
import { ChatRoomMembersModule } from '../chat-room-members/chat-room-members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
    LoggerModule,
    Database,
    CommonModule,
    UsersModule,
    AuthModule,
    ChatRoomsModule,
    ChatMessagesModule,
    ChatRoomMembersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
