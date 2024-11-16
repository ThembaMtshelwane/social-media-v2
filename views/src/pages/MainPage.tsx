import { useEffect } from "react";
import Tweet from "../components/TweetContent";
import { useTweet } from "../api/tweets";

const MainPage: React.FC = () => {
  const { fetchTweets, tweets } = useTweet();
  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  if (!tweets.length) return <h1>No Available Tweets</h1>;

  const leftCol = tweets.filter((_, index) => index % 2 === 0);
  const rightCol = tweets.filter((_, index) => index % 2 !== 0);

  return (
    <div className=" grid lg:grid-cols-2 gap-5 relative">
      <div className="space-y-5">
        {leftCol.map((tweet) => (
          <Tweet tweet={tweet} key={tweet._id} />
        ))}
      </div>
      <div className="space-y-5">
        {rightCol.map((tweet) => (
          <Tweet tweet={tweet} key={tweet._id} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
