import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CredentialsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
