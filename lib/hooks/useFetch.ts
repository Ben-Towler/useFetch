import React, { useCallback, useEffect, useReducer, useRef } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { createFetchReducer } from '@lib/reducers';
import { useCache } from "@lib/providers";
import {
  FetchActionType as ActionType,
  FetchStatus as Status,
  FetchState as State,
  FetchAction as Action,
  Endpoint,
  Reducer,
} from '@lib/types';

type StateRef<T> = { current: State<T> }
type Data<T> = { data: T }
type Get<T> = (config?: AxiosRequestConfig) => Promise<State<T>>;
type FetchReducer<T> = Reducer<State<T>, Action<T>>;

export const useFetch = <T>(
  endpoint: Endpoint,
  config?: AxiosRequestConfig,
  isLazy?: boolean,
): { get: Get<T> } & State<T> => {
  
  const [state, dispatch] = useReducer<FetchReducer<T>>(createFetchReducer<T>(), {
    status: Status.INIT,
    error: undefined,
    data: undefined,
    isLoading: true,
  });

  const { cache, updateCache } = useCache();
  const url = process.env.apiBaseUrl + endpoint;

  const stateRef: StateRef<T> = useRef(null);
  stateRef.current = state;

  useEffect(() => {
    if (isLazy) return;
    (async() => await get(config))();
  }, []);

  const onSuccess = (data: T, requestKey: string) => {
    dispatch({
      type: ActionType.SUCCESS,
      payload: data,
    });
    updateCache({ [requestKey]: data });
  };

  const get: Get<T> = useCallback(
    async (config) => {
      const key = {url, params: config?.params};
      const requestKey = JSON.stringify(key);

      if (cache?.[requestKey]) {
        dispatch({
          type: ActionType.CACHE,
          payload: cache[requestKey],
        });

        stateRef.current = cache[requestKey];
      }
      
      dispatch({ type: ActionType.REQUEST });

      try {
        const { data }: Data<T> = await axios.get(url, config);
        onSuccess(data, requestKey);
      } catch (error) {
        dispatch({
          type: ActionType.FAILURE,
          payload: error.message,
        });
      }
      return stateRef.current;
    }, []
  );

  return {
    ...state,
    get,
  };
}
