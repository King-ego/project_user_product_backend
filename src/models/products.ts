import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Users from './user';

@Entity('products')
class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'provider_id' })
  user: Users;

  @Column()
  UPC: number;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  composition: string;

  @Column()
  amount: number;

  @Column()
  size: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Products;
