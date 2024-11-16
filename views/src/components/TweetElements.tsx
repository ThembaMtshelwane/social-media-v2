import { IoIosAddCircleOutline, IoMdCloseCircle } from "react-icons/io";
import { MAX_IMAGES } from "../definitions";

export const FileInput: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({ onChange, disabled }) => (
  <div className="relative">
    <input
      type="file"
      accept="image/*"
      id="image-upload"
      multiple
      className="hidden"
      onChange={onChange}
      disabled={disabled}
    />
    <label
      htmlFor="image-upload"
      className={`flex items-center justify-center w-full h-20  border-2 border-dashed border-accent rounded-lg cursor-pointer hover:bg-gray-200 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {disabled ? (
        <span className="text-sm text-gray-500">
          Max {MAX_IMAGES} images allowed
        </span>
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <IoIosAddCircleOutline size={36} />
          <span className="mt-2 text-sm">Add images (up to {MAX_IMAGES})</span>
        </div>
      )}
    </label>
  </div>
);

export const ImagePreviews: React.FC<{
  images: { preview: string }[];
  onRemove: (index: number) => void;
}> = ({ images, onRemove }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((img, index) => (
        <div key={index} className="relative h-24 w-full">
          <img
            src={img.preview}
            alt={`Preview ${index + 1}`}
            className="h-full w-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500 hover:text-red-700"
          >
            <IoMdCloseCircle size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export const CaptionTextarea: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
}> = ({ value, onChange, maxLength }) => (
  <div className="relative">
    <textarea
      name="caption"
      placeholder="What's on your mind?"
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
    ></textarea>
    <span className="absolute bottom-2 right-2 text-sm text-gray-500">
      {value.length}/{maxLength}
    </span>
  </div>
);
