import { createAsyncAction } from "typesafe-actions";

import { IError } from "../../services/model";
import { ITweetData } from "../../services/api/tweets/model";

interface ISuccess {
  initial?: boolean;
  tweets: ITweetData;
}

const getTweets = createAsyncAction(
  "tweets/GET_TWEETS_REQUEST",
  "tweets/GET_TWEETS_SUCCESS",
  "tweets/GET_TWEETS_ERROR",
  "tweets/GET_TWEETS_CANCEL"
)<undefined, ISuccess, IError, undefined>();

export default getTweets;
