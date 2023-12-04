import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('post_categorys')
export class PostCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PostEntity, (post: PostEntity) => post.categories)
  posts: PostEntity[];

  @DeleteDateColumn()
  deletedAt: Date;
}
