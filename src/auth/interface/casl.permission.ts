import { PermissionAction } from "../enum/permission.action";

export interface CaslPermission {
  action: PermissionAction;
  subject: string;
}