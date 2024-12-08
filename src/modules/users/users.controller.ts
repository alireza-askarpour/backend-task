import { Controller, Get, Inject } from '@nestjs/common';
import { GetUser } from '@src/common/decorators';
import { ApiGetMe } from './docs/get-me.doc';
import { USERS_SERVICE, IUsersService } from './interfaces';
import { ILoggerService, LOGGER_SERVICE } from '../logger/interfaces';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @ApiGetMe()
  @Get('@me')
  public getMe(@GetUser('user_id') userId: string) {
    this.logger.log('Called get me', UsersController.name);
    return this.usersService.getMe(userId);
  }
}
