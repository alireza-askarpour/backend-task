import { User } from '../entities/user.entity';

export interface IUsersRepository {
  create(user: Partial<User>): Promise<User>;
  findByEmail(email: string, select?: (keyof User)[]): Promise<User>;
  findByUserId(userId: string, select?: (keyof User)[]): Promise<User>;
}
