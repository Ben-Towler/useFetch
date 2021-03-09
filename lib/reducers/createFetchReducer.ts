import {
  FetchActionType as ActionType,
  FetchStatus as Status,
  FetchState as State,
  FetchAction as Action,
} from '@lib/types';

export const createFetchReducer = <T>() => (
  state: State<T>,
  action: Action<T>,
): State<T> => {
  switch (action.type) {
    case ActionType.CACHE:
      return({
        ...state,
        isLoading: false,
        status: Status.CACHE,
        data: action.payload,
      });
    case ActionType.REQUEST:
      // Avoid updating state unnecessarily
      // By returning unchanged state React won't re-render
      if (state.status === Status.INFLIGHT) {
        return state;
      }
      return({
        ...state,
        status: Status.INFLIGHT,
      });
    case ActionType.SUCCESS:
      return({
        ...state,
        isLoading: false,
        status: Status.FETCHED,
        data: action.payload,
      });
    case ActionType.FAILURE:
      return({
        ...state,
        isLoading: false,
        status: Status.ERROR,
        error: action.payload,
      });
    default:
      return state
  }
};