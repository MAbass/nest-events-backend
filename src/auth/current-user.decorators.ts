import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(((data: unknown, input: ExecutionContext) => {
  const request = input.switchToHttp().getRequest();
  return request.user ?? null;
}));