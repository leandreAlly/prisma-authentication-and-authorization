import { CustomError } from './custom-error';

export class ConflictRequestError extends CustomError {
  statusCode = 409;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ConflictRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
