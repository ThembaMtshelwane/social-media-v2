import { useCallback, useMemo, useState } from "react";
import { MAX_CAPTION_LENGTH, MAX_IMAGES, Tweet, Media } from "../definitions";
import { CaptionTextarea, FileInput, ImagePreviews } from "./TweetElements";
import { useTweet } from "../api/tweets";
import { compressImage } from "../utils";
import ObjectID from "bson-objectid";

const EditTweet: React.FC<{ id: string; tweet: Tweet }> = ({ id, tweet }) => {
  const [images, setImages] = useState<Media[]>(tweet.media || []);
  const [caption, setCaption] = useState<string>(tweet.caption || "");
  const { updateTweet } = useTweet();

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
        const newImages: Media[] = compressedBase64Images.map((img) => ({
          mediaId: new ObjectID().toString(),
          url: img,
          tweetId: id,
          updatedAt: new Date().toISOString(),
        }));
        return [...prevImages, ...newImages].slice(0, MAX_IMAGES);
      });
    },
    [id]
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

    const updatedTweet: Partial<Tweet> = {
      caption,
      media: images,
      updatedAt: new Date().toISOString(),
    };

    console.log("Updating tweet with data:", updatedTweet);
    console.log("Updating tweet with id:", id);
    await updateTweet(id, updatedTweet);
  };

  const imagePreviews = useMemo(
    () =>
      images.map((media) => ({
        preview: media.url,
      })),
    [images]
  );

  return (
    <section className="p-4 bg-primary rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Edit Tweet</h1>
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
          Update
        </button>
      </form>
    </section>
  );
};

export default EditTweet;
