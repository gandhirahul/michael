import React, { FC } from "react";
import { useSelector } from "react-redux";
import { tweetsSelector } from "../../../../../store/tweets/selectors";

import Tweet from "../Tweet";

const TweetList: FC = () => {
  const tweets = useSelector(tweetsSelector);

  return (
    <>
      {tweets.map(({ id, image, username, text }) => (
        <Tweet key={id} id={id} image={image} username={username} text={text} />
      ))}
    </>
  );
};

export default TweetList;
