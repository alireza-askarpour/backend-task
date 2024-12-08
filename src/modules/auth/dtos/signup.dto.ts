import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    default: 'askarpourdev@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'Alireza Askarpour',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  full_name: string;

  @ApiProperty({
    default: '@alireza#',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
