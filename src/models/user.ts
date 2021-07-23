import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Products from './products';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Users;
