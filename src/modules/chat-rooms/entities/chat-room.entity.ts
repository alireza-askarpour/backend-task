import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@src/modules/users/entities/user.entity';
import { ChatRoomMember } from '@src/modules/chat-room-members/entities/chat-room-member.entity';

@Entity('chat_rooms')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  chat_room_id: string;

  @Column({ type: 'uuid' })
  owner_id: string;

  // Relation to User as the owner
  @ManyToOne(() => User, user => user.chatRooms, { onDelete: 'CASCADE' })
  owner: User;

  // Relation to ChatRoomMember
  @OneToMany(() => ChatRoomMember, chatRoomMember => chatRoomMember.chatRoom)
  members: ChatRoomMember[];

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at?: Date;
}
