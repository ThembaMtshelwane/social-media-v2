import { useState } from "react";

export const FollowButtons: React.FC = () => {
  const [followToggle, seFollowToggle] = useState(false);
  return (
    <button
      className={`bg-secondary col-[2/3] mx-4  w-[120px] px-2 py-1 text-sm rounded  ${
        followToggle ? "hover:bg-red-400 hover:border-red-400 hover:border" : ""
      }`}
      onClick={() => seFollowToggle((prev) => !prev)}
    >
      {followToggle ? "Following" : "Follow ?"}
    </button>
  );
};

export default FollowButtons;
