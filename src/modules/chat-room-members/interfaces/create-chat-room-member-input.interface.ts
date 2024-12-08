import { ChatRoomMemberRole } from '../entities/chat-room-member.entity';

export interface CreateChatRoomMemberInput {
  chat_room_id: string;
  user_id: string;
  role: ChatRoomMemberRole;
}
