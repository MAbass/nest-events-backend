export interface ErrorInterface {
  status: number;
  message: string;
  type: string;
  errorCode: number;
  errors: object[];
  timestamp: string;
}