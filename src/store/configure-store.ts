import {
  createStore,
  applyMiddleware,
  combineReducers,
  Store,
  Middleware
} from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

type IConfigureStore = () => Store;

/**
 * Configure store with reducers and saga middleware
 */
const configureStore: IConfigureStore = (): Store => {
  const middleware: Array<Middleware> = [];
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  const store: Store = createStore(
    combineReducers({ ...reducers }),
    applyMiddleware(...middleware)
  );
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore;
