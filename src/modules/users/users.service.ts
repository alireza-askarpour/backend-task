import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY } from './interfaces/tokens';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { IUsersService } from './interfaces/users-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: IUsersRepository) {}

  public async getMe(userId: string): Promise<{ user: User }> {
    const user = await this.usersRepository.findByUserId(userId, [
      'user_id',
      'email',
      'full_name',
      'avatar_url',
      'created_at',
      'updated_at',
    ]);

    return {
      user,
    };
  }
}
