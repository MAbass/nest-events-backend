import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectsEntity } from "./objects.entity";
import { PermissionAction } from "../../auth/enum/permission.action";

@Entity()
export class PermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  action: PermissionAction;
  @ManyToOne(() => ObjectsEntity, object => object.id )
  object: ObjectsEntity;

}