import {
    Injectable,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const exists = await this.usersRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ],
        });
        if (exists) {
            throw new ConflictException('Invalid data');
        }

        const user = this.usersRepository.save(createUserDto);
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.preload({
            id,
            ...updateUserDto,
        });
        if (!user) {
            throw new ConflictException('Invalid data');
        }

        return await this.usersRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find({ order: { id: 'ASC' } });
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { username },
            select: ['id', 'username', 'email', 'password'],
        });
    }

    async findById(id: number): Promise<User | null> {
        const user = this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Article not found');
        }
        return user;
    }
}
