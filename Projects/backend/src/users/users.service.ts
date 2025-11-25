import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepo.findOneBy({ id });
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepo.create(user);
    return this.usersRepo.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ email });
  }
}
