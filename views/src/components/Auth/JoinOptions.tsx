import GoogleAuthButton from "./AuthButtons/GoogleAuthButton";

type JoinOptionsProps = {
  openCreateAccount: boolean;
  setOpenCreateAccount: (openCreateAccount: boolean) => void;
};
const JoinOptions: React.FC<JoinOptionsProps> = ({
  openCreateAccount,
  setOpenCreateAccount,
}) => {
  return (
    <div className="my-10  row-span-2 max-w-[320px] mx-auto lg:mx-0">
      <h3 className="font-semibold text-3xl my-5 mx-auto sm:text-4xl">
        Join today.
      </h3>
      <div className="flex flex-col">
        <GoogleAuthButton />

        <span className="grid grid-cols-[45%_10%_45%] items-center justify-center my-2">
          <span className="border"></span>
          <p className="text-center">or</p>
          <span className="border"></span>
        </span>

        <button
          className="bg-secondary"
          onClick={() => setOpenCreateAccount(!openCreateAccount)}
        >
          Create account
        </button>
        <p className="text-[12px] my-1">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </p>
      </div>
    </div>
  );
};

export default JoinOptions;
