import { FcGoogle } from "react-icons/fc";

const GoogleAuthButton: React.FC = () => {
  return (
    <button className="flex items-center  bg-accent text-primary rounded-2xl px-4 py-2">
      <div className="flex items-center justify-center mx-auto space-x-4">
        <FcGoogle />
        <p className="">Sign in with Google</p>
      </div>
    </button>
  );
};

export default GoogleAuthButton;
