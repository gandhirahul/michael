import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";

import { IState } from "./model";
import getTweets from "./actions";

const initialState: IState = {
  polling: false,
  tweets: [],
  errorMessage: undefined
};

type IActions = ActionType<typeof getTweets>;

const reducer: Reducer<IState, IActions> = (
  state = initialState,
  action
): IState => {
  switch (action.type) {
    case getType(getTweets.request):
      return {
        ...state,
        polling: true
      };

    case getType(getTweets.success): {
      const { initial, tweets } = action.payload;

      if (initial) {
        return {
          ...state,
          errorMessage: undefined,
          tweets
        };
      }

      return {
        ...state,
        errorMessage: undefined,
        tweets: [...tweets, ...state.tweets]
      };
    }

    case getType(getTweets.cancel):
      return {
        ...state,
        polling: false
      };

    default:
      return state;
  }
};

export default reducer;
