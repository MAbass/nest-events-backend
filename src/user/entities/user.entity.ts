import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Event } from "../../events/entities/event.entity";
import { RoleEnum } from "../enum/role.enum";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ type: "enum", enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Event, (event) => event.user, {})
  events: Event[];

}
