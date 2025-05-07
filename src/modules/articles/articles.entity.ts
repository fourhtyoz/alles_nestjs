import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/users.entity';
import { Comment } from 'src/modules/comments/comments.entity';

enum ArticleStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived',
}

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255,
        nullable: false,
        comment: 'Article title with max 200 chars',
    })
    title: string;

    @Column('text')
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => User, (user) => user.articles, {
        onDelete: 'CASCADE',
    })
    author: User;

    @OneToMany(() => Comment, (comment) => comment.article)
    comments: Comment[];

    @Column({
        type: 'enum',
        enum: ArticleStatus,
        default: ArticleStatus.PUBLISHED,
    })
    status: ArticleStatus;
}
