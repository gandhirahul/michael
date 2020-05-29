import { createAsyncAction, createAction } from "typesafe-actions";

import { IError } from "../../services/model";
import { ITweetData } from "../../services/api/tweets/model";

interface ISuccess {
  initial?: boolean;
  tweets: ITweetData;
}

export const getTweets = createAsyncAction(
  "tweets/GET_TWEETS_REQUEST",
  "tweets/GET_TWEETS_SUCCESS",
  "tweets/GET_TWEETS_ERROR",
  "tweets/GET_TWEETS_CANCEL"
)<undefined, ISuccess, IError, undefined>();

export const getPreviousTweets = createAsyncAction(
  "tweets/GET_PREVIOUS_TWEETS_REQUEST",
  "tweets/GET_PREVIOUS_TWEETS_SUCCESS",
  "tweets/GET_PREVIOUS_TWEETS_ERROR",
  "tweets/GET_PREVIOUS_TWEETS_CANCEL"
)<undefined, ITweetData, IError, undefined>();

export const pause = createAction("tweets/PAUSE")<boolean>();
