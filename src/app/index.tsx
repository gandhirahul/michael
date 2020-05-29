import React, { FC } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Home from "./pages/Home";

const App: FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect to="/" />
  </Switch>
);

export default App;
