import { Reducer } from "@lib/types";

export enum FetchActionType {
  REQUEST = 'request',
  CACHE = 'cache',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum FetchStatus {
  INIT = 'init',
  INFLIGHT = 'inFlight',
  CACHE = 'fromCache',
  FETCHED = 'fetched',
  ERROR = 'error',
}

export type FetchState<T> = {
  status: FetchStatus.INIT | FetchStatus.CACHE | FetchStatus.INFLIGHT | FetchStatus.FETCHED | FetchStatus.ERROR;
  data?: T;
  error?: string;
  isLoading: boolean;
}

export type FetchAction<T> =
  | { type: FetchActionType.REQUEST; }
  | { type: FetchActionType.SUCCESS; payload: T; }
  | { type: FetchActionType.CACHE; payload: T; }
  | { type: FetchActionType.FAILURE; payload: string; }
  

export type Endpoint = '/users';

export type FetchReducer<T> = Reducer<FetchState<T>, FetchAction<T>>;
