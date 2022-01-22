import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException } from "@nestjs/common";
import { Request, Response } from "express";

export class EntityNotFoundException extends NotFoundException {
  constructor(entity: string) {
    super(`The ${entity} is not found`);
  }

}
