import { ChatRoomMember } from '@src/modules/chat-room-members/entities/chat-room-member.entity';
import { ChatMessage } from '../entities/chat-message.entity';

export interface IChatEmit {
  joinMember(chatRoomId: string, member: ChatRoomMember): void;
  sendMessage(chatRoomId: string, chatMessage: ChatMessage): void;
}
