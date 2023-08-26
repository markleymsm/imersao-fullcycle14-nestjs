import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ cors: '*' })
export class RoutesGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('handle message', payload);
    return 'Hello world!';
  }
}
