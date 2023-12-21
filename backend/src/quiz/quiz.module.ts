import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { QuizController } from './quiz.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Answer])],
  providers: [QuizService],
  controllers: [QuizController],
  exports: [QuizService],
})
export class QuizModule {}
