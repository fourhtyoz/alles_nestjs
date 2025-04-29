import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = this.commentsRepository.create(createCommentDto);
        return this.commentsRepository.save(comment);
    }

    async update(
        id: number,
        updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
        const exists = await this.commentsRepository.findOne({ where: { id } });
        if (!exists) {
            throw new NotFoundException('Comment not found');
        }
        await this.commentsRepository.update(id, updateCommentDto);
        return this.commentsRepository.findOneOrFail({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.commentsRepository.delete(id);
    }
}
