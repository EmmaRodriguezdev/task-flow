import { ErrorCodes } from './enums';

export interface Error<T = undefined> {
  errorCodeName: ErrorCodes;
  message: string;
  details?: T;
  timestamp: Date;
  stack: string;
}