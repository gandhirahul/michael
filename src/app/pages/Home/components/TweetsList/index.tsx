import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tweetsSelector } from "../../../../../store/tweets/selectors";

import { TweetsContainer } from "./styles";
import Tweet from "../Tweet";
import { pause, getPreviousTweets } from "../../../../../store/tweets/actions";

const TweetList: FC = () => {
  const dispatch = useDispatch();
  const tweets = useSelector(tweetsSelector);

  const handleScroll = ({
    target: { scrollTop, scrollHeight, clientHeight }
  }: any) => {
    if (scrollTop === 0) {
      // top
      dispatch(pause(false));
    } else if (scrollTop + clientHeight === scrollHeight) {
      // bottom
      dispatch(getPreviousTweets.request());
      dispatch(pause(true));
    } else {
      dispatch(pause(true));
    }
  };

  return (
    <TweetsContainer onScroll={handleScroll}>
      {tweets.map(({ id, image, username, text }) => (
        <Tweet key={id} id={id} image={image} username={username} text={text} />
      ))}
    </TweetsContainer>
  );
};

export default TweetList;
