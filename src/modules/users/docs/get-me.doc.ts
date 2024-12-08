import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';

export const ApiGetMe = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get logged in user',
    }),
    ApiOkResponse({
      schema: {
        example: {
          user: {
            user_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
            email: 'askarpourdev@gmail.com',
            full_name: 'Alireza Askarpour',
            avatar_url: null,
            created_at: '2024-11-22T17:13:29.366Z',
            updated_at: '2024-11-22T17:13:29.366Z',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
  );
};
