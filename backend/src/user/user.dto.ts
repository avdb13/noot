import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { QuizDto } from 'src/quiz/quiz.dto';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(5)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(5)
  readonly id: string;

  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;
}

export class UserInfoDto {
  readonly username: string;
  readonly email: string;
  readonly quizzes: QuizDto[];
}
