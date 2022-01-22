import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

@Entity("event")
export class Event {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  when: Date;
  @Column()
  address: string;
  @ManyToOne(() => UserEntity, (user) => user.events, { nullable: false, eager: true })
  @JoinColumn()
  user: UserEntity;

}
