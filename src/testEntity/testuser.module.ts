import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUsersService } from './testuser.service';
import { Testuser } from './testuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testuser])],
  providers: [TestUsersService],
})
export class TestUsersModule {}
