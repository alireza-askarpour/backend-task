import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiGetChatRoomMemberList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get chat room member list with pagination',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: null,
          response: {
            data: [
              {
                chat_room_member_id: '4426a76b-f5d6-4a29-93ec-e22b3cb541b3',
                role: 'user',
                created_at: '2024-12-09T00:26:20.031Z',
                updated_at: '2024-12-09T00:26:20.031Z',
                user: {
                  user_id: '2d46d85c-2d9c-4ef5-a817-28e33e0a73c6',
                  email: 'amir@gmail.com',
                  full_name: 'Alireza Askarpour',
                  avatar_url: null,
                  created_at: '2024-12-09T00:04:24.422Z',
                  updated_at: '2024-12-09T00:04:24.422Z',
                },
                chatRoom: {
                  chat_room_id: 'e4a383d5-83ba-4a9f-a02e-1189400ba616',
                  owner_id: '039545a2-e94c-40f6-876b-8ee26d216705',
                  title: 'two chat room',
                  created_at: '2024-12-08T15:54:04.577Z',
                  updated_at: '2024-12-08T15:54:04.577Z',
                },
              },
            ],
            meta: {
              page: 1,
              take: 10,
              itemCount: 1,
              pageCount: 1,
              hasPreviousPage: false,
              hasNextPage: false,
            },
          },
        },
      },
    }),
  );
};
