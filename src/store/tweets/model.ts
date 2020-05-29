import { DeepReadonly } from "utility-types";

export type ITweet = Readonly<{
  id: number;
  image: string;
  username: string;
  text: string;
  timestamp: number;
}>;

export type ITweets = ITweet[];

export type IState = DeepReadonly<{
  polling: boolean;
  paused: boolean;
  errorMessage: string | undefined;
  tweets: ITweets;
}>;
