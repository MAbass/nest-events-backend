import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Event } from "../../events/entities/event.entity";
import { RoleEnum } from "../enum/role.enum";
import { PermissionsEntity } from "../../adminconfig/entities/permissions.entity";
@Entity("user")
export class UserEntity {
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
  @ManyToMany(type => PermissionsEntity, { cascade: true })
  @JoinTable({
    name: "user_permissions",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" }
  })
  permissions: PermissionsEntity[];

}
