import { User } from '../user/user.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.quizzes)
  user: string;

  @OneToMany(() => Question, (question) => question.quiz, {})
  questions: Question[];
}
