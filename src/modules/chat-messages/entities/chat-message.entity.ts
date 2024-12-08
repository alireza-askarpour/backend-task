import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum Type {
  TEXT = 'text',
}

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  chat_message_id: string;

  @Column('uuid')
  chat_room_id: string;

  @Column('uuid')
  owner_id: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar', enum: [Type.TEXT] })
  type: Type;

  @Column({ type: 'uuid', nullable: true })
  reply_id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at?: Date;
}
