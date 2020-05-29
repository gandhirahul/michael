import { createSelector } from "reselect";

import { IRootState } from "../model";
import { IState, ITweets } from "./model";

export const stateSelector = ({ tweets }: IRootState): IState => tweets;

/**
 * Creates a selector that returns the current list of tweets
 */
export const tweetsSelector = createSelector(
  stateSelector,
  ({ tweets }: IState): Readonly<ITweets> => tweets
);

export const pauseSelector = createSelector(
  stateSelector,
  ({ paused }: IState): Readonly<ITweets> => paused
);
