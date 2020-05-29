import axios, { AxiosPromise } from "axios";

import { ITweetData } from "./model";

/**
 * Fetch X amount of latest tweets
 * @param amount - the amount of tweets to fetch (between 1 and 50)
 * @returns A promise containing an array of tweets
 */
export const getLatestTweets = (
  amount: number = 10
): AxiosPromise<ITweetData> => axios.get(`/api?count=${amount}`);

/**
 * Fetch X amount of latest tweets after the supplied tweet id
 * @param amount - the amount of tweets to fetch (between 1 and 50)
 * @returns A promise containing an array of tweets
 */
export const getTweetsAfterId = (
  id: number,
  amount: number = 50
): AxiosPromise<ITweetData> => axios.get(`/api?count=${amount}&afterId=${id}`);
