import { ErrorCodes } from './enums';

export interface Error<T = undefined> {
  errorCodeName: ErrorCodes;
  message: string;
  details?: T;
  timestamp: Date;
  stack: string;
}

export interface IBasicData {
  id: number;
  createdAt: string;
  updatedAt: string | null;
}