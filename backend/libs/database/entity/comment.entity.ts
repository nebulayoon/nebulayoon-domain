import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entitiy';

@Entity('post_comments')
export class PostCommentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.posts)
  author: UserEntity;
}
