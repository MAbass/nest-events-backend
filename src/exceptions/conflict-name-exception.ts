import { ConflictException } from "@nestjs/common";

export class ConflictNameException extends ConflictException {
  constructor(name: string) {
    super(`Conflict in name: ${name}`);
  }
}