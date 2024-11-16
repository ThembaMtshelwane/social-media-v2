export type User = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  DOB: string;
  avatar?: string;
  banner?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  followers?: string[];
};

export type Media = {
  mediaId: string;
  url: string;
  tweetId: string;
  createdAt?: string;
  updatedAt: string;
};

export type Like = {
  userId: string;
  tweetId: string;
  likedAt: string;
};

export type Comment = {
  userId: string;
  tweetId: string;
};
export type Tweet = {
  _id: string;
  caption: string;
  userId: string;
  media?: Media[];
  likes?: Like[];
  comments?: Comment[];
  createdAt?: string;
  updatedAt: string;
  parentTweetId?: string;
};

export const MAX_IMAGES = 3;
export const MAX_CAPTION_LENGTH = 105;
