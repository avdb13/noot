import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @ManyToOne(() => Question, (question) => question.answers)
  quiz: Quiz;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  correct: boolean;
}
