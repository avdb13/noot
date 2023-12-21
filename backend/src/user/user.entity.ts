import { Quiz } from '../quiz/quiz.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false, default: false })
  isActive: boolean;

  @OneToMany(() => Quiz, (quiz) => quiz.user, { eager: true })
  quizzes: Quiz[];
}
