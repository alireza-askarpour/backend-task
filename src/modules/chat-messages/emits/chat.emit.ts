import { forwardRef, Inject } from '@nestjs/common';
import { SocketKeys } from '../constants';
import { ChatMessagesGateway } from '../chat-messages.gateway';
import { ChatRoomMember } from '@src/modules/chat-room-members/entities/chat-room-member.entity';
import { ChatMessage } from '../entities/chat-message.entity';
import { IChatEmit } from '../interfaces/chat-emit.interface';

export class ChatEmit implements IChatEmit {
  constructor(@Inject(forwardRef(() => ChatMessagesGateway)) private chatMessagesGateway: ChatMessagesGateway) {}

  // listen event Join a member
  joinMember(chatRoomId: string, member: ChatRoomMember): void {
    this.chatMessagesGateway.server.to(chatRoomId).emit(SocketKeys.NEW_MEMBER, { chatRoomId, member });
  }

  // listen event to get new message from chat
  sendMessage(chatRoomId: string, chatMessage: ChatMessage): void {
    this.chatMessagesGateway.server.to(chatRoomId).emit(SocketKeys.SEND_MESSAGE, { chatRoomId, chatMessage });
  }
}
