import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AUTH_SERVICE } from './interfaces/tokens';
import { LoggerModule } from '../logger/logger.module';
import { JwtModule } from '@src/libs/jwt';
import { IJwt } from '@src/libs/jwt/interfaces';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    JwtModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        jwtConfig: configService.get<IJwt>('jwt'),
        issuer: configService.get<string>('app_id'),
        domain: configService.get<string>('app_domain'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
