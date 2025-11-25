/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
