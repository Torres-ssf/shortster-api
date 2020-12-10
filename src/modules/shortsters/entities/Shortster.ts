import { User } from '@modules/users/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shortsters')
@Unique(['code'])
export class Shortster {
  @PrimaryColumn()
  id: string;

  @Column()
  code: string;

  @Column()
  url: string;

  @Column('timestamp with time zone')
  last_access: Date;

  @Column()
  times_accessed: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
