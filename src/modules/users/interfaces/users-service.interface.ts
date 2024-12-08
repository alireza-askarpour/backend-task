import { User } from '../entities/user.entity';

export interface IUsersService {
  getMe(userId: string): Promise<{ user: User }>;
}
