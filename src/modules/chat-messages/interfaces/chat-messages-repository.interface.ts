import { ChatMessage } from '../entities/chat-message.entity';
import { CreateChatMessageInput } from './create-chat-message-input.interface';

export interface IChatMessagesRepository {
  create(data: CreateChatMessageInput): Promise<ChatMessage>;
  findById(id: string): Promise<ChatMessage>;
}
