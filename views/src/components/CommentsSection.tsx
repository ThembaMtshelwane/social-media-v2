import { useEffect } from "react";
import { useTweet } from "../api/tweets";
import Tweet from "./TweetContent";

const CommentsSection: React.FC<{ parentTweetId: string }> = ({
  parentTweetId = "",
}) => {
  const { comments, fetchCommentTweets } = useTweet();
  useEffect(() => {
    fetchCommentTweets(parentTweetId);
  }, [fetchCommentTweets, parentTweetId]);

  return (
    <>
      <h2 className="text-3xl font-bold mt-8">{comments?.length} Comments </h2>
      <div className=" h-[50vh] overflow-x-hidden overflow-y-auto relative  flex items-center justify-center my-4">
        <div className="absolute top-0 left-0 flex flex-col gap-5 justify-center w-full">
          {comments !== null ? (
            comments.map((comment) => (
              <Tweet tweet={comment} key={comment._id} />
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentsSection;
