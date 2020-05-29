import { all, fork } from "redux-saga/effects";

import tweetSaga from "./tweets/sagas";

const sagas = [tweetSaga];

/**
 * Root saga yielding a fork of all app sagas
 */
export default function*() {
  yield all(sagas.map(saga => fork(saga)));
}
