import { FaXTwitter } from "react-icons/fa6";
import JoinOptions from "../components/Auth/JoinOptions";
import { useState } from "react";
import AuthModal from "../components/Auth/AuthModal";
import CreateAccountForm from "../components/Auth/CreateAccountForm";
import SignInForm from "../components/Auth/SignInForm";

const LandingPage: React.FC = () => {
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);
  const [openCreateAccount, setOpenCreateAccount] = useState<boolean>(false);
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-[90vh] items-center lg:h-screen">
      <div className="text-[312px] mb-10 hidden lg:flex justify-self-center">
        <FaXTwitter />
      </div>
      <section className="flex flex-col mt-10 mx-auto p-4 max-w-[320px] sm:max-w-[480px]">
        <div className="text-5xl mb-10 lg:hidden">
          <FaXTwitter />
        </div>

        <h1 className="text-5xl font-semibold row-span-2 sm:text-6xl">
          Happening now
        </h1>
        <JoinOptions
          setOpenCreateAccount={setOpenCreateAccount}
          openCreateAccount={false}
        />

        <div className="row-span-2 max-w-[320px] mx-auto w-full lg:mx-0">
          <p className="mb-2">Already have an account?</p>
          <button
            className="w-full text-secondary border"
            onClick={() => setOpenSignIn((prev) => !prev)}
          >
            Sign in
          </button>
        </div>
      </section>
      <AuthModal isOpen={openSignIn} setIsOpen={setOpenSignIn}>
        <SignInForm />
      </AuthModal>
      <AuthModal isOpen={openCreateAccount} setIsOpen={setOpenCreateAccount}>
        <CreateAccountForm />
      </AuthModal>
    </section>
  );
};

export default LandingPage;
