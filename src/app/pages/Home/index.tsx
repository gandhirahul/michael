import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { HomeContainer } from "./styles";
import TweetsList from "./components/TweetsList";
import { getTweets } from "../../../store/tweets/actions";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTweets.request());
    return () => {
      dispatch(getTweets.cancel());
    };
  }, [dispatch]);

  return (
    <HomeContainer>
      <TweetsList />
    </HomeContainer>
  );
};

export default App;
