import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiCreateChatRoom = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create chat room',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          message: null,
          response: {
            chat_room: {
              title: 'five chat room',
              chat_room_id: 'ee60023b-00a7-4808-872a-5d9dabf757c2',
              created_at: '2024-12-08T16:24:15.757Z',
              updated_at: '2024-12-08T16:24:15.757Z',
              owner: {
                user_id: '039545a2-e94c-40f6-876b-8ee26d216705',
                email: 'askarpourdev@gmail.com',
                full_name: 'Alireza Askarpour',
                avatar_url: null,
                created_at: '2024-12-08T14:03:30.816Z',
                updated_at: '2024-12-08T14:03:30.816Z',
              },
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: 400,
          timestamp: '2024-12-08T11:26:11.492Z',
          path: '/api/v1/chat-rooms',
          message: 'Bad Request',
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 400,
          timestamp: '2024-12-08T11:30:22.328Z',
          path: '/api/v1/chat-rooms',
          message: [
            'title must be shorter than or equal to 255 characters',
            'title should not be empty',
            'title must be a string',
          ],
        },
      },
    }),
  );
};
