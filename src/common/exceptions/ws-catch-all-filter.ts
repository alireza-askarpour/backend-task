import { Socket } from 'socket.io';
import { ArgumentsHost, BadRequestException, ExceptionFilter } from '@nestjs/common';
import { WsBadRequestException, WsUnknownException } from './ws-exceptions';
import { SocketKeys } from '@src/modules/chat-messages/constants/socket.keys';

export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: Socket = host.switchToWs().getClient();

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();
      const exceptionMessage = exceptionData['message'] ?? exceptionData ?? exception.name;

      const wsException = new WsBadRequestException(exceptionMessage);
      socket.emit(SocketKeys.EXCEPTION, wsException.getError());
      return;
    }

    const wsException = new WsUnknownException(exception.message);
    socket.emit(SocketKeys.EXCEPTION, wsException.getError());
  }
}
