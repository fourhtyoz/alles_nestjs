import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/users.entity';
import { Article } from 'src/modules/articles/articles.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 1000,
        nullable: false,
        comment: 'Comment with max 1000 chars',
    })
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => User, (user) => user.comments, {
        onDelete: 'CASCADE',
    })
    author: User;

    @ManyToOne(() => Article, (article) => article.comments, {
        onDelete: 'CASCADE',
    })
    article: Article;
}
