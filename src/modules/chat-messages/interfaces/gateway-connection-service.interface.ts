import { Socket } from 'socket.io';

export interface IGatewayConnectionService {
  handleConnection(client: Socket): Promise<void>;
}
