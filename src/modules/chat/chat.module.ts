import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from 'src/modules/users/users.entity';
import { Message } from './entities/message.entity';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Message, Room, User])],
    providers: [ChatService, ChatGateway],
})
export class ChatModule {}
