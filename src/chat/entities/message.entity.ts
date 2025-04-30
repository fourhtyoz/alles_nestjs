import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => User, (user) => user.messages)
    author: User;

    @ManyToOne(() => Room, (room) => room.messages)
    room: Room;

    @CreateDateColumn()
    createdAt: Date;
}
