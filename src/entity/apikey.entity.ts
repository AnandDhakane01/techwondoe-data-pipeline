import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ApiKeys {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  key!: string;
}
