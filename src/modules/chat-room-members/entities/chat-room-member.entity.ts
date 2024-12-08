import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from '@src/modules/chat-rooms/entities/chat-room.entity';
import { User } from '@src/modules/users/entities/user.entity';

export enum ChatRoomMemberRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('chat_room_members')
export class ChatRoomMember extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  chat_room_member_id: string;

  @Column({ type: 'uuid' })
  chat_room_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  invite_id?: string;

  @Column({ type: 'varchar', enum: [ChatRoomMemberRole.ADMIN, ChatRoomMemberRole.USER] })
  role: ChatRoomMemberRole;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relation to User
  @ManyToOne(() => User, user => user.chatRoomMemberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relation to ChatRoom
  @ManyToOne(() => ChatRoom, chatRoom => chatRoom.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_room_id' })
  chatRoom: ChatRoom;
}
