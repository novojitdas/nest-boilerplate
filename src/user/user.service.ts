import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }
  // ✅ Create a new user with hashed password
  async createUser(email: string, password: string): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, password: hashed });
    return this.repo.save(user);
  }
}
