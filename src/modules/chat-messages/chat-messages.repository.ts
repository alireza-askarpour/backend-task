import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage, Type } from './entities/chat-message.entity';
import { IChatMessagesRepository } from './interfaces/chat-messages-repository.interface';
import { CreateChatMessageInput } from './interfaces/create-chat-message-input.interface';

@Injectable()
export class ChatMessagesRepository implements IChatMessagesRepository {
  constructor(@InjectRepository(ChatMessage) private chatMessageEntity: Repository<ChatMessage>) {}

  public create(data: CreateChatMessageInput): Promise<ChatMessage> {
    console.log(data);
    const newChatMessage: ChatMessage = this.chatMessageEntity.create({
      chat_room_id: data.chat_room_id,
      owner_id: data.owner_id,
      content: data.content,
      reply_id: data?.reply_id ?? null,
      type: Type.TEXT,
    });
    return this.chatMessageEntity.save(newChatMessage);
  }

  public findById(id: string): Promise<ChatMessage> {
    return this.chatMessageEntity.findOne({ where: { chat_message_id: id } });
  }
}
