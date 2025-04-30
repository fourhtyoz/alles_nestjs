import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async saveMessage(data: { roomId: number; userId: number; text: string }) {
        const room = await this.roomRepository.findOne({
            where: { id: data.roomId },
        });
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        const user = await this.userRepository.findOne({
            where: { id: data.userId },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const message = this.messageRepository.save({
            text: data.text,
            room: room,
            author: user,
        });

        return message;
    }
}
