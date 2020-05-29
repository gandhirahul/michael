import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";

import { IState } from "./model";
import * as actions from "./actions";

const initialState: IState = {
  polling: false,
  tweets: [],
  paused: false,
  errorMessage: undefined
};

type IActions = ActionType<typeof actions>;

const reducer: Reducer<IState, IActions> = (
  state = initialState,
  action
): IState => {
  switch (action.type) {
    case getType(actions.getTweets.request):
      return {
        ...state,
        polling: true
      };

    case getType(actions.getTweets.success): {
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

    case getType(actions.getTweets.cancel):
      return {
        ...state,
        polling: false
      };

    case getType(actions.pause):
      const paused = action.payload;
      return {
        ...state,
        paused
      };

    case getType(actions.getPreviousTweets.success):
      console.log("!!", action);
      const tweets = action.payload;
      return {
        ...state,
        tweets: [...state.tweets, ...tweets]
      };

    default:
      return state;
  }
};

export default reducer;
