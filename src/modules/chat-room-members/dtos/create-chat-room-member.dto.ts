import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateChatRoomMemberDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  inviteId?: string;
}
