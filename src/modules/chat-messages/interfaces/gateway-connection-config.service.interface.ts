import { Socket } from 'socket.io';

export interface IGatewayConnectionConfigService {
  handleAuthentication(client: Socket, authorization: string): Promise<void>;
  extractToken(authorization: string): string;
  disconnect(socket: Socket, error: any): void;
  handleEnforceSingleDeviceConnection(userId: string, client: any): Promise<void>;
}
