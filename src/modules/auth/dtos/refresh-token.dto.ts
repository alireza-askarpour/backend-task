import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmM2NjBiNTMtMjVhMC00MzVlLWE1ZWMtZDhmMDE1MGEzMTM3IiwidG9rZW5JZCI6ImVlNDA4ZWE1LTQ4N2YtNDE0NS05YTUxLTc0NmNhZmNiOWRhNSIsImlhdCI6MTczMTQzMTU4MCwiZXhwIjoxNzM0MDIzNTgwLCJhdWQiOiJsb2NhbGhvc3Q6MzAwMCIsImlzcyI6ImMzNzg0YWQ4LWRiYmUtNDdjYy04NjQ3LWI5MWZjYTBhZDJiYiIsInN1YiI6IjZjNjYwYjUzLTI1YTAtNDM1ZS1hNWVjLWQ4ZjAxNTBhMzEzNyJ9.HQd0dMkxWBCXIlg5ujEMJP2X-kJ-Eag5xcqVrDb6fCA',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
