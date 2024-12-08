import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY, USERS_SERVICE } from './interfaces';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [USERS_SERVICE, USERS_REPOSITORY],
})
export class UsersModule {}
