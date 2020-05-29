import React, { FC } from "react";

import { Well, Image, Username, Text } from "./styles";

interface IProps {
  id: number;
  image?: string;
  username: string;
  text: string;
}

const Tweet: FC<IProps> = ({ id, image, username, text }) => (
  <Well key={id}>
    <div>
      <Image alt="profile image" src={image} />
    </div>
    <div>
      <Username>{username}</Username>
      <Text>{text}</Text>
    </div>
  </Well>
);

export default Tweet;
