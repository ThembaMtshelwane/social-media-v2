import { useState } from "react";
import { useTweet } from "../../api/tweets";
import AuthModal from "../Auth/AuthModal";
import EditTweet from "../EditTweet";
import { Tweet } from "../../definitions";

export const AlterButtons: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="flex  w-full col-span-4 px-3 space-x-4">
      <EditTweetButton id={id} />
      <DeleteTweetButton id={id} />
    </div>
  );
};

export const EditTweetButton = ({ id }: { id: string }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const { tweets } = useTweet();
  const tweet = tweets.find((t) => t._id === id) as Tweet;

  return (
    <>
      <button
        onClick={() => {
          console.log("edit");
          setOpenEdit((prev) => !prev);
        }}
        className="bg-secondary w-[80px] hover:bg-[#2c67a6]"
      >
        Edit
      </button>
      <AuthModal isOpen={openEdit} setIsOpen={setOpenEdit}>
        <EditTweet id={id} tweet={tweet} />
      </AuthModal>
    </>
  );
};

export const DeleteTweetButton = ({ id }: { id: string }) => {
  const { deleteTweet } = useTweet();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this tweet?"
    );
    if (confirm) {
      await deleteTweet(id);
      alert("Tweet deleted successfully");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-400 hover:bg-red-500 w-[80px]"
    >
      Delete
    </button>
  );
};
