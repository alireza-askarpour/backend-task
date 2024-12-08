import { DynamicModule, Global, Module, OnModuleInit } from '@nestjs/common';
import { JWT_SERVICE } from './constants';
import { JwtService } from './jwt.service';
import { IJwt } from './interfaces';
import { JWT_SERVICE_CONFIG } from './constants/tokens';

@Global()
@Module({})
export class JwtModule implements OnModuleInit {
  constructor() {}

  static forRootAsync(options: {
    useFactory: (...args: any[]) => { jwtConfig: IJwt; issuer: string; domain: string };
    inject?: any[];
  }): DynamicModule {
    const asyncOptions = options.useFactory;

    return {
      module: JwtModule,
      providers: [
        {
          provide: 'JWT_CONFIG',
          useFactory: async (...args: any[]) => asyncOptions(...args).jwtConfig,
          inject: options.inject || [],
        },
        {
          provide: 'ISSUER',
          useFactory: async (...args: any[]) => asyncOptions(...args).issuer,
          inject: options.inject || [],
        },
        {
          provide: 'DOMAIN',
          useFactory: async (...args: any[]) => asyncOptions(...args).domain,
          inject: options.inject || [],
        },
        {
          provide: JWT_SERVICE,
          useClass: JwtService,
        },
        {
          provide: JWT_SERVICE_CONFIG,
          useClass: JwtService,
        },
      ],
      exports: [JWT_SERVICE],
    };
  }

  onModuleInit() {}
}
