import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: false,
  entities: [User],
  synchronize: false, // or true in dev
  logging: false,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const email = 'test@example.com';

  const existing = await userRepo.findOneBy({ email });
  if (existing) {
    console.log('User already exists:', email);
  } else {
    const passwordHash = await bcrypt.hash('test123', 10);
    const user = userRepo.create({ email, password: passwordHash });
    await userRepo.save(user);
    console.log('User seeded:', email);
  }

  await AppDataSource.destroy();
}

seed().catch(console.error);
