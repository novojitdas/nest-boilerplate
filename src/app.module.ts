import { Module } from '@nestjs/common';
// DB Config
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
// Controller Service Entity Module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Testuser } from './testEntity/testuser.entity';
import { TestUsersModule } from './testEntity/testuser.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('db');
        return {
          ...db,
          entities: [Testuser, User], // Can also use autoLoadEntities: true if using feature modules
        };
      },
    }),
    AuthModule,
    UserModule,
    // TestUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
