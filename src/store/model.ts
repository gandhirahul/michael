import { StateType } from "typesafe-actions";

import reducers from "./reducers";

export type IRootState = StateType<typeof reducers>;
