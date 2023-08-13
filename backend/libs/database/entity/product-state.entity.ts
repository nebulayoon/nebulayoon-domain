import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductEntity } from './product.entitiy';

@Entity('product_states')
@Unique(['stateNumber'])
export class ProductStateEntity {
  // @PrimaryGeneratedColumn('increment')
  // id: number;

  @OneToMany(() => ProductEntity, (product) => product.stateNumber)
  @PrimaryColumn()
  @IsNotEmpty()
  @IsNumber()
  stateNumber: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  state: string;

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
  deletedAt: Date;
}
