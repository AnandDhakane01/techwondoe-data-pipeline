import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  primary_id!: number;

  @Column()
  id!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  dob!: string;

  @Column()
  gender!: string;
}
