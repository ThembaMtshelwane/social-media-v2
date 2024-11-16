import { useState, useCallback, useMemo } from "react";
import { useTweet } from "../api/tweets";
import ObjectID from "bson-objectid";
import { Tweet, Comment, MAX_IMAGES, MAX_CAPTION_LENGTH } from "../definitions";
import { compressImage } from "../utils";
import { CaptionTextarea, FileInput, ImagePreviews } from "./TweetElements";

const CreateTweet: React.FC<{
  parentTweetId?: string;
}> = ({ parentTweetId = "" }) => {
  const [images, setImages] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const { createTweet, updateTweet } = useTweet();
  const currentDummyUser = "67346ab0d8813e388dc12188";

  const handleImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const validImages = files.filter((file) =>
        file.type.startsWith("image/")
      );

      const compressedImagePromises = validImages.map((file) =>
        compressImage(file)
      );
      const compressedBase64Images = await Promise.all(compressedImagePromises);

      setImages((prevImages) => {
        const newImages = [...prevImages, ...compressedBase64Images];
        return newImages.slice(0, MAX_IMAGES);
      });
    },
    []
  );

  const removeImage = useCallback((index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, []);

  const handleCaptionChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCaption(event.target.value);
    },
    []
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const tweetId = new ObjectID().toString();
    const media = images.map((img) => ({
      mediaId: new ObjectID().toString(),
      url: img,
      tweetId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const tweetData: Tweet = {
      _id: tweetId,
      caption,
      userId: currentDummyUser,
      media,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentTweetId,
    };

    console.log("Form submitted with data:", tweetData);
    await createTweet(tweetData);

    if (parentTweetId) {
      const newComment: Comment = {
        userId: currentDummyUser,
        tweetId: tweetId,
      };
      const addedComments = {
        comments: [newComment],
      };
      await updateTweet(parentTweetId, addedComments);
    }
    setCaption("");
    setImages([]);
  };

  const imagePreviews = useMemo(
    () =>
      images.map((imgBase64) => ({
        preview: imgBase64,
      })),
    [images]
  );

  return (
    <section className="">
      <h1 className="text-2xl font-semibold mb-4">Create Tweet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FileInput
          onChange={handleImageChange}
          disabled={images.length >= MAX_IMAGES}
        />
        <ImagePreviews images={imagePreviews} onRemove={removeImage} />
        <CaptionTextarea
          value={caption}
          onChange={handleCaptionChange}
          maxLength={MAX_CAPTION_LENGTH}
        />
        <button
          type="submit"
          className="w-full py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary-dark"
        >
          Post
        </button>
      </form>
    </section>
  );
};

export default CreateTweet;
