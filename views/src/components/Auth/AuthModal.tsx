import { ReactNode } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

type AuthModalProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  setIsOpen,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <section className="fixed inset-0 bg-black bg-opacity-80 top-0 left-0 flex z-50 overflow-y-auto">
          <div className="bg-primary w-full max-w-[650px] mx-auto my-auto  min-h-[50vh]  rounded-3xl p-8  ">
            <div
              className="text-2xl absolute cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <IoClose />
            </div>
            <div className="text-5xl mb-10  lg:flex justify-self-center">
              <FaXTwitter />
            </div>
            {children}
          </div>
        </section>
      )}
    </>
  );
};

export default AuthModal;
