export class ErrorResponse extends Error {
  statusCode: number;
  data: Object | undefined;
  constructor(message: string, statusCode: number, data?: Object) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}
