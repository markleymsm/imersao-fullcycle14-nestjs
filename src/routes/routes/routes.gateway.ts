import { InjectQueue } from '@nestjs/bull';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Queue } from 'bull';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: '*' })
export class RoutesGateway {
  constructor(@InjectQueue('new-points') private newPointsQueue: Queue) {}

  @SubscribeMessage('new-points')
  async handleMessage(
    client: Socket,
    payload: { route_id: string; lat: number; lng: number },
  ) {
    await this.newPointsQueue.add(payload);

    client.broadcast.emit('admim-new-points', payload);
    client.broadcast.emit(`new-point/${payload.route_id}`, payload);
  }
}
