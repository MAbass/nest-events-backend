import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubjectEntity } from "./subject.entity";
import { PermissionAction } from "../../auth/enum/permission.action";

@Entity()
export class PermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  action: PermissionAction;
  @ManyToOne(() => SubjectEntity, object => object.id )
  subject: SubjectEntity;

}