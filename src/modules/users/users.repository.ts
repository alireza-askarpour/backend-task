import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IUsersRepository } from './interfaces/users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {}

  public async create(user: Partial<User>): Promise<User> {
    const newUser = this.userEntity.create(user);
    return await this.userEntity.save(newUser);
  }

  public async findByEmail(email: string, select?: (keyof User)[]): Promise<User> {
    return this.userEntity.findOne({
      where: { email },
      select,
    });
  }

  public async findByUserId(userId: string, select?: (keyof User)[]): Promise<User> {
    return this.userEntity.findOne({
      where: { user_id: userId },
      select,
    });
  }
}
