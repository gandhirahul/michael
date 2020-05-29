import { takeLatest, delay, take, call, put, race } from "redux-saga/effects";
import { getType } from "typesafe-actions";

import getTweetsAction from "./actions";
import { getLatestTweets, getTweetsAfterId } from "../../services/api/tweets";
import { ITweetData } from "../../services/api/tweets/model";

const POLL_DELAY = 2000;
const INITIAL_TWEET_COUNT = 10;
const TWEETS_AFTER_ID_COUNT = 50;

/**
 * Recursively fetch chunks of 50 (api max) tweets, until all tweets are fetched
 * from the supplied id to the latest. For example, this would be required if
 * 60 tweets were posted within 2 seconds.
 * @param id - the tweet to fetch to latest tweets from
 * @returns An array of tweets from id to latest
 */
function* getFromIdToLatestSaga(id: number) {
  let currentId = id;
  let tweets: ITweetData = [];
  while (true) {
    try {
      const { data }: { data: ITweetData } = yield call(
        getTweetsAfterId,
        currentId,
        TWEETS_AFTER_ID_COUNT
      );
      currentId = data[0].id;
      tweets = [...data, ...tweets];
      if (data.length < TWEETS_AFTER_ID_COUNT) {
        return tweets;
      }
    } catch (error) {
      yield put(getTweetsAction.failure(error));
    }
  }
}

/**
 * Infinitely poll for complete list of tweets from supplied id to latest
 * @param id - the tweet to fetch to latest tweets from
 */
function* pollFromIdSaga(id: number) {
  let currentId = id;
  while (true) {
    try {
      const data: ITweetData = yield call(getFromIdToLatestSaga, currentId);
      currentId = data[0].id;
      yield put(getTweetsAction.success({ tweets: data }));
      yield delay(POLL_DELAY);
    } catch (error) {
      yield put(getTweetsAction.failure(error));
    }
  }
}

/**
 * Fetch the 10 latest tweets before initiating a 2 second poll for latest tweets
 */
function* getLatestTweetsSaga() {
  while (true) {
    try {
      const { data }: { data: ITweetData } = yield call(
        getLatestTweets,
        INITIAL_TWEET_COUNT
      );
      yield put(getTweetsAction.success({ initial: true, tweets: data }));

      // only starting polling when tweets not empty, otherwise keep trying to get latest
      if (data.length > 0) {
        yield delay(POLL_DELAY);
        const latestId = data[0].id;
        yield call(pollFromIdSaga, latestId);
      }
      yield delay(POLL_DELAY);
    } catch (error) {
      yield put(getTweetsAction.failure(error));
    }
  }
}

/**
 * Starts infinitely polling for latest tweets until explicitly cancelled
 */
function* startPollingTweetsSaga() {
  yield race({
    task: call(getLatestTweetsSaga),
    cancel: take(getType(getTweetsAction.cancel))
  });
}

/**
 * Starts polling flow when a getTweet request action is dispatched
 */
export default function* rootSaga() {
  yield takeLatest(getType(getTweetsAction.request), startPollingTweetsSaga);
}
