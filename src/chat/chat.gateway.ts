import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @MessageBody() roomId: number,
        @ConnectedSocket() client: Socket,
    ) {
        client.join(`room-${roomId}`);
        client.emit('joinedRoom', roomId);
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() data: { roomId: number; userId: number; text: string },
        @ConnectedSocket() client: Socket,
    ) {
        const message = await this.chatService.saveMessage(data);
        this.server.to(`room-${data.roomId}`).emit('newMessage', message);
    }
}
