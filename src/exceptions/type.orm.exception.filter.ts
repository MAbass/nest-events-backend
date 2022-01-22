import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { TypeORMError } from "typeorm";
import { ErrorInterface } from "./error-interface";

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const response = host.switchToHttp().getResponse();
    let message: string = (exception as TypeORMError).message;
    let code: number = (exception as any).code;
    const customResponse: ErrorInterface = {
      status: 500,
      message: "Something Went Wrong",
      type: "Internal Server Error",
      errors: [{ code: code, message: message }],
      errorCode: 300,
      timestamp: new Date().toISOString()
    };

    response.status(customResponse.status).json(customResponse);
  }

}