import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testuser } from './testuser.entity';

@Injectable()
export class TestUsersService implements OnModuleInit {
  constructor(
    @InjectRepository(Testuser)
    private userRepo: Repository<Testuser>,
  ) {}

  async onModuleInit() {
    const user = this.userRepo.create({ name: 'Neon User' });
    await this.userRepo.save(user);
    console.log('✅ Connected to DB and inserted user!');
  }
}
