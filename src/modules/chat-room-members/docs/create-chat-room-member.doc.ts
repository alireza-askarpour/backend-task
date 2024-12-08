import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

export const ApiCreateChatRoomMember = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'join new member to chat room',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          message: 'MEMBER_JOINED_TO_CHAT_ROOM',
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: 400,
          timestamp: '2024-12-08T19:19:30.839Z',
          path: '/api/v1/chat_room_members/e4a383d5-83ba-4a9f-a02e-1189400ba616',
          message: 'MEMBER_EXISTS',
        },
      },
    }),
  );
};
