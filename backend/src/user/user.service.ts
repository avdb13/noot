import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ username, password, email }: RegisterUserDto) {
    const hash = await bcrypt.hash(password, 10);

    return this.usersRepository.insert({ username, password: hash, email });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['quizzes'] });
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.quizzes', 'quizzes')
      .select([
        'user.id',
        'user.email',
        'user.username',
        'user.password',
        'quizzes',
      ])
      .where('user.email = :id OR user.username = :id', { id })
      .getOne();
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
