import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/thunks/authThunks";
import { Link } from "react-router-dom";

const UserProfileCard = ({ user, toggle }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <div
        className={`z-10 ${
          !toggle && "hidden"
        } absolute -left-24 mt-5 divide-y rounded-lg shadow w-44 bg-gray-700 divide-gray-600 `}
      >
        <div className="px-4 py-3 text-sm text-white">
          <div>{user ? user.displayName : ""}</div>
          <div className="font-medium truncate">{user ? user.email : ""}</div>
        </div>
        <ul className="py-2 text-sm text-gray-200">
          <li>
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
            >
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="py-1">
          <div
            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
            onClick={handleLogout}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
