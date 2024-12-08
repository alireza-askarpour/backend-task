import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiRefreshToken = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'refresh token for get new access token',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 201,
          message: null,
          response: {
            accessToken:
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmM2NjBiNTMtMjVhMC00MzVlLWE1ZWMtZDhmMDE1MGEzMTM3IiwiaWF0IjoxNzMxNDMxNTgwLCJleHAiOjE3MzQwMjM1ODAsImF1ZCI6ImxvY2FsaG9zdDozMDAwIiwiaXNzIjoiYzM3ODRhZDgtZGJiZS00N2NjLTg2NDctYjkxZmNhMGFkMmJiIiwic3ViIjoiNmM2NjBiNTMtMjVhMC00MzVlLWE1ZWMtZDhmMDE1MGEzMTM3In0.GBUrbTPcuKyUW7BygWMaXTxTzmsXUphPlkw3iHrDzxOBxqmhpzGYzR6ZR6jurVcTBIlKYpLh7rDjHzdXp0-bl2-kolpp-tc9xoiB2QvcI-y5PuoYhGUZRj9y-BySchV5ajXK1ROdPa9fjKTW9lBsFE6lBWzcTm6g0DNtVF1Gvd6VKYoBBA9-SasMbWVhXMNn46RSpJg-GROkOb1qsL979KiSWY6I5pojPhK9pROdubgl6M4bF761PURbqgrvGXoSqLv4bIMM77FUmeDhMC2Ap8tIyTvG--mr8xhgpyWbmhEAaXe1m1mOUIBCZ6zX0tfd1qU8UCDy05MumbqafHR70g',
            refreshToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmM2NjBiNTMtMjVhMC00MzVlLWE1ZWMtZDhmMDE1MGEzMTM3IiwidG9rZW5JZCI6ImVlNDA4ZWE1LTQ4N2YtNDE0NS05YTUxLTc0NmNhZmNiOWRhNSIsImlhdCI6MTczMTQzMTU4MCwiZXhwIjoxNzM0MDIzNTgwLCJhdWQiOiJsb2NhbGhvc3Q6MzAwMCIsImlzcyI6ImMzNzg0YWQ4LWRiYmUtNDdjYy04NjQ3LWI5MWZjYTBhZDJiYiIsInN1YiI6IjZjNjYwYjUzLTI1YTAtNDM1ZS1hNWVjLWQ4ZjAxNTBhMzEzNyJ9.HQd0dMkxWBCXIlg5ujEMJP2X-kJ-Eag5xcqVrDb6fCA',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          message: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
  );
};
