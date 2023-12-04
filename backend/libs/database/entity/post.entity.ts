import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  RelationId,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { UserEntity } from './user.entitiy';
import { PostCategoryEntity } from './category.entity';
import { PostCommentEntity } from './comment.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column('text')
  @IsNotEmpty()
  @IsString()
  text: string;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.posts)
  author: UserEntity;

  @RelationId((post: PostEntity) => post.author)
  public authorId: number;

  @ManyToMany(
    () => PostCategoryEntity,
    (category: PostCategoryEntity) => category.posts,
  )
  @JoinTable()
  categories: PostCategoryEntity[];

  @OneToMany(
    () => PostCommentEntity,
    (comment: PostCommentEntity) => comment.post,
  )
  comments: PostCommentEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
