import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../api/users";
import { Tweet, User } from "../definitions";

type Props = {
  tweet: Tweet;
  children: ReactNode;
};

const UserPreview: React.FC<Props> = ({ tweet, children }) => {
  const { users, fetchUser } = useUser();

  const user = users.find((u) => u._id === tweet.userId);

  useEffect(() => {
    if (!user) {
      fetchUser(tweet.userId);
    }
  }, [fetchUser, user, tweet.userId]);
  return (
    <div className="grid grid-cols-5 grid-rows-2 items-center mb-5 h-[110px]">
      <Link
        to={`/index/profile/${user?._id}`}
        className="col-[1/2] row-[1/3]  h-full w-full flex items-center justify-center"
      >
        <img
          className="object-cover object-center h-full w-[100px] rounded-full"
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
          }
          alt=""
        />
      </Link>
      <div className=" flex flex-col col-span-4 px-3 ">
        <Link to={`/index/profile/${user?._id}`}>
          <h3 className="text-xl">
            {user?.firstName} {user?.lastName}
          </h3>
          <h3 className="text-sm text-gray-500">@{user?.username}</h3>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserPreview;

export const FollowerInfo = ({ user }: { user: User }) => {
  return (
    <div className="flex gap-2  sm:flex-row">
      <p> {user?.followers?.length} followers</p>
      <p> {0} following </p>
    </div>
  );
};
