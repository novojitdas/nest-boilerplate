import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Testuser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
