import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { GiFeather } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import AuthModal from "./Auth/AuthModal";
import CreateTweet from "./CreateTweet";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [openCreateTweet, setOpenCreateTweet] = useState(false);
  const currentDummyUserId = "67346a6ed8813e388dc12182";
  return (
    <>
      {isOpen && (
        <section className="fixed  z-10 bg-opacity-50  md:hidden bg-black h-screen inset-0">
          <section className="w-[180px] bg-secondary fixed top-0 h-screen flex flex-col">
            <section className="h-[50vh] my-auto space-y-4">
              <div
                className="text-2xl cursor-pointer hover:scale-105 p-4 flex justify-around items-center"
                onClick={() => setIsOpen(false)}
              >
                <IoClose />
                <h2>Close</h2>
              </div>
              <Link
                to="/index"
                className="text-2xl cursor-pointer hover:scale-105 p-4  flex justify-around items-center "
                onClick={() => setIsOpen(false)}
              >
                <FaXTwitter />
                <h2>Home</h2>
              </Link>
              {/* <div className="text-2xl cursor-pointer hover:scale-105 p-4  flex justify-around items-center">
                <IoSearch />
                <h2>Search</h2>
              </div> */}
              <Link
                to={`/index/profile/${currentDummyUserId}`}
                className="text-2xl cursor-pointer hover:scale-105 p-4  flex justify-around items-center"
                onClick={() => setIsOpen(false)}
              >
                <CgProfile />
                <h2>Profile</h2>
              </Link>
              <div
                className="text-2xl cursor-pointer hover:scale-105 p-4  flex justify-around items-center"
                onClick={() => {
                  setOpenCreateTweet(!openCreateTweet);
                  setIsOpen(false);
                }}
              >
                <GiFeather />
                <h2>Tweet</h2>
              </div>
            </section>
          </section>
        </section>
      )}

      <div className="hidden border md:flex flex-col w-fit h-[180px] fixed left-5 z-40 top-1/4 mx-2 justify-between py-6 p-4 rounded-3xl">
        <Link to="/index" className="text-xl">
          <FaXTwitter />
        </Link>
        {/* <Link to="" className="text-xl cursor-pointer">
          <IoSearch />
        </Link> */}
        <Link
          to={`/index/profile/${currentDummyUserId}`}
          className="text-2xl cursor-pointer"
        >
          <CgProfile />
        </Link>
        <div
          className="text-xl cursor-pointer"
          onClick={() => setOpenCreateTweet(!openCreateTweet)}
        >
          <GiFeather />
        </div>
      </div>
      <AuthModal isOpen={openCreateTweet} setIsOpen={setOpenCreateTweet}>
        <CreateTweet />
      </AuthModal>
    </>
  );
};

export default Sidebar;
