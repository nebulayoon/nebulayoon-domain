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

@Entity('product_monetary_units')
@Unique(['monetaryUnitNumber'])
export class ProductMonetaryUnitEntity {
  // @PrimaryGeneratedColumn('increment')
  // id: number;

  @OneToMany(() => ProductEntity, (product) => product.monetaryUnit)
  @PrimaryColumn()
  @IsNotEmpty()
  @IsNumber()
  monetaryUnitNumber: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  unitName: string;

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
