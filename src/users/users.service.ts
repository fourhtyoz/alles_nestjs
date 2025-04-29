import { Injectable, ConflictException } from '@nestjs/common';
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

        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const exists = await this.usersRepository.findOne({ where: { id } });
        if (!exists) {
            throw new ConflictException('Invalid data');
        }

        await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOneOrFail({ where: { id } });
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
        return this.usersRepository.findOne({ where: { id } });
    }
}
