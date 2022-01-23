import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../../events/entities/event.entity";
import { RoleEntity } from "../../adminconfig/entities/role.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
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
  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: false })
  @JoinTable({
    name: "user_roles",
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" },
    joinColumn: { name: "user_id", referencedColumnName: "id" }
  })
  roles: RoleEntity[];
}
