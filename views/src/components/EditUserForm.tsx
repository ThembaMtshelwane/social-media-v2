import { useCallback, useState } from "react";
import { IoIosAddCircleOutline, IoMdCloseCircle } from "react-icons/io";

const EditUserForm: React.FC<{ setOpen: (isOpen: boolean) => void }> = ({
  setOpen,
}) => {
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const targetName = event.target.name;

      if (file?.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;

          if (targetName === "Avatar") {
            setAvatar(base64String);
          } else if (targetName === "Banner") {
            setBanner(base64String);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const removeAvatar = () => setAvatar("");
  const removeBanner = () => setBanner("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = { avatar, banner, password, confirmPassword, username };
    console.log("Edited user:", user);
    setOpen(false);
  };
  return (
    <section className="sm:w-[80%] mx-auto">
      <h1 className="text-4xl mb-5 font-semibold"> Edit your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8 ">
        <>
          <FileInput
            onChange={handleImageChange}
            name={"Avatar"}
            fileURL={avatar}
          />
          <PreviewImage
            fileURL={avatar}
            onRemove={removeAvatar}
            name="Avatar"
          />
        </>
        <>
          <FileInput
            onChange={handleImageChange}
            name={"Banner"}
            fileURL={banner}
          />
          <PreviewImage
            fileURL={banner}
            onRemove={removeBanner}
            name="Banner"
          />
        </>

        <input
          type="text"
          name="username"
          required
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="bg-accent text-primary">Save</button>
      </form>
    </section>
  );
};

export default EditUserForm;

const FileInput = ({
  fileURL,
  name,
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  fileURL: string;
}) => {
  return (
    <>
      <input
        type="file"
        id={`${name}-upload`}
        accept="image/*"
        className="hidden"
        onChange={onChange}
        name={name}
      />

      <label
        htmlFor={`${name}-upload`}
        className={`flex items-center justify-center w-full h-20  border-2 border-dashed border-accent rounded-lg cursor-pointer hover:bg-gray-200 ${
          fileURL ? "cursor-not-allowed opacity-50 hidden" : ""
        }`}
      >
        {fileURL ? (
          <span className="text-sm text-gray-500">Edit {name}</span>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <IoIosAddCircleOutline size={36} />
            <span className="mt-2 text-sm">Add {name}</span>
          </div>
        )}
      </label>
    </>
  );
};

const PreviewImage = ({
  fileURL,
  onRemove,
  name,
}: {
  fileURL: string;
  name: string;
  onRemove: () => void;
}) => {
  return (
    <>
      {fileURL && (
        <div className="relative h-24 w-full">
          <img
            src={fileURL}
            alt={`Preview ${1}`}
            className="h-full w-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500 hover:text-red-700"
          >
            <IoMdCloseCircle size={20} />
          </button>
          <p>{name} </p>
        </div>
      )}
    </>
  );
};
