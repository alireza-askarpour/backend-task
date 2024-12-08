import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiGetChatRoomList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get chat room list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: null,
          response: {
            data: [
              {
                chat_room_id: 'b5b2a152-4a80-412b-b31d-bc3642d62420',
                title: 'one chat room',
                created_at: '2024-12-08T15:46:42.068Z',
                updated_at: '2024-12-08T15:46:42.068Z',
                owner: {
                  user_id: '039545a2-e94c-40f6-876b-8ee26d216705',
                  email: 'askarpourdev@gmail.com',
                  full_name: 'Alireza Askarpour',
                  avatar_url: null,
                  created_at: '2024-12-08T14:03:30.816Z',
                  updated_at: '2024-12-08T14:03:30.816Z',
                },
              },
              {
                chat_room_id: 'e4a383d5-83ba-4a9f-a02e-1189400ba616',
                title: 'two chat room',
                created_at: '2024-12-08T15:54:04.577Z',
                updated_at: '2024-12-08T15:54:04.577Z',
                owner: {
                  user_id: '039545a2-e94c-40f6-876b-8ee26d216705',
                  email: 'askarpourdev@gmail.com',
                  full_name: 'Alireza Askarpour',
                  avatar_url: null,
                  created_at: '2024-12-08T14:03:30.816Z',
                  updated_at: '2024-12-08T14:03:30.816Z',
                },
              },
            ],
            meta: {
              itemCount: 2,
              pageCount: null,
              hasPreviousPage: false,
              hasNextPage: false,
            },
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 401,
          timestamp: '2024-12-08T10:55:07.102Z',
          path: '/api/v1/chat-rooms',
          message: 'UNAUTHORIZED',
        },
      },
    }),
  );
};
