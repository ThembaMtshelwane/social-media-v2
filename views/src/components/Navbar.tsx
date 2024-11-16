import { FaXTwitter } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Navbar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <nav className="border-b px-6 py-4 flex justify-between md:hidden">
      <Link to="/index">
        <div className="text-2xl  p-4 w-fit ">
          <FaXTwitter />
        </div>
      </Link>

      <div
        className="text-2xl  p-4 w-fit md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TiThMenu />
      </div>

      <ul className="hidden md:flex border items-center w-[35%] justify-between">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </nav>
  );
};

export default Navbar;
