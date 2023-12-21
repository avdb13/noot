import { IsNotEmpty } from 'class-validator';

export class QuizDto {
  @IsNotEmpty()
  readonly user: string;

  @IsNotEmpty()
  readonly questions: QuestionDto[];
}

export class QuestionDto {
  @IsNotEmpty()
  readonly body: string;

  @IsNotEmpty()
  readonly answers: AnswerDto[];
}

export class AnswerDto {
  @IsNotEmpty()
  readonly body: string;

  @IsNotEmpty()
  readonly correct: boolean;
}
