import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductStateEntity } from './product-state.entity';
import { ProductMonetaryUnitEntity } from './product-monetaryunit.entity';

@Entity('products')
@Unique(['link'])
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => ProductStateEntity,
    (productState) => productState.stateNumber,
  )
  @Column()
  @IsNotEmpty()
  @IsNumber()
  stateNumber: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ManyToOne(
    () => ProductMonetaryUnitEntity,
    (productMonetaryUnit) => productMonetaryUnit.monetaryUnitNumber,
  )
  @Column()
  @IsNotEmpty()
  @IsNumber()
  monetaryUnit: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  date: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  writer: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  views: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  link: string;

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
