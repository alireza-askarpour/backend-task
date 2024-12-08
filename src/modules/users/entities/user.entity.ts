import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ChatRoom } from '@src/modules/chat-rooms/entities/chat-room.entity';
import { ChatRoomMember } from '@src/modules/chat-room-members/entities/chat-room-member.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  full_name: string;

  @Column({ type: 'varchar' })
  password_hash: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => ChatRoom, chatRoom => chatRoom.owner)
  chatRooms: ChatRoom[];

  // Relation to ChatRoomMember
  @OneToMany(() => ChatRoomMember, chatRoomMember => chatRoomMember.user)
  chatRoomMemberships: ChatRoomMember[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password_hash) {
      const saltRounds = 10;
      this.password_hash = await bcrypt.hash(this.password_hash, saltRounds);
    }
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password_hash);
  }
}
