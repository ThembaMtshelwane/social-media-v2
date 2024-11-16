import { useParams } from "react-router-dom";
import TweetContent from "../components/TweetContent";
import { useTweet } from "../api/tweets";
import { useEffect, useState } from "react";
import CommentsSection from "../components/CommentsSection";

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tweet, fetchTweet } = useTweet();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTweet = async () => {
      if (!id) {
        setError("Tweet ID not provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await fetchTweet(id);
      } catch (error) {
        setError(`Failed to load tweet. Please try again. ${error}`);
      } finally {
        setLoading(false);
      }
    };
    loadTweet();
  }, [fetchTweet, id]);

  if (loading) {
    return <div className="text-center">Loading tweet...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500"> {error}</div>;
  }

  if (!tweet || !tweet._id) {
    return <div className="text-center">Tweet not found.</div>;
  }

  return (
    <div className="">
      <TweetContent tweet={tweet} />
      <CommentsSection parentTweetId={id || ""} />
    </div>
  );
};

export default SinglePost;
