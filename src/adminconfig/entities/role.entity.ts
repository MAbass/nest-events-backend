import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionsEntity } from "./permissions.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({unique: true})
  name: string;
  @ManyToMany(type => PermissionsEntity, { cascade: true })
  @JoinTable({
    name: "role_permissions",
    joinColumn: { name: "role_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" }
  })
  permissions: PermissionsEntity[];
  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable({
    name: "user_roles",
    joinColumn: { name: "role_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "user_id", referencedColumnName: "id" }
  })
  users: UserEntity[];
}