import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @OneToMany(() => Question, (question) => question.quiz, {})
  answers: Answer[];
}
