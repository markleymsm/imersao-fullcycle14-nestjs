import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: '*' })
export class RoutesGateway {
  @SubscribeMessage('new-points')
  handleMessage(
    client: Socket,
    payload: { route_id: string; lat: number; lng: number },
  ) {
    client.broadcast.emit('admim-new-points', payload);
    client.broadcast.emit(`new-point/${payload.route_id}`, payload);
  }
}
