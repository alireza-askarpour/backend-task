export interface CreateChatMessageInput {
  content: string;
  chat_room_id: string;
  reply_id?: string;
  owner_id: string;
}
