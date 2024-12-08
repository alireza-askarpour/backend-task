import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateChatMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  chat_room_id: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  reply_id?: string;
}
