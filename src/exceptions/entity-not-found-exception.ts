import { NotFoundException } from "@nestjs/common";

export class EntityNotFoundException extends NotFoundException {
  constructor(entity: string) {
    super(`The ${entity} is not found`);
  }

}
