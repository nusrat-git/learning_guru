import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/thunks/authThunks";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

const UserProfileCard = ({
  user,
  toggle,
  handleToggle,
  handleSearchChange,
}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <div
        className={`relative w-10 h-10 overflow-hidden ${
          user && "rounded-full bg-gray-600"
        } cursor-pointer`}
        type="button"
        onClick={handleToggle}
      >
        {user ? (
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <IoMdMenu className="absolute w-8 h-8 text-white bg-black md:-left-1" />
        )}
      </div>
      <div
        className={`z-10 ${
          !toggle && "hidden"
        } absolute -left-28 md:-left-24 mt-5 divide-y rounded-lg shadow w-44 bg-gray-700 divide-gray-600 `}
      >
        <div>
          <div className="md:hidden max-w-md m-2">
            <div className="relative flex items-center w-full h-10 rounded-md focus-within:shadow-lg bg-gray-500 overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-white pl-2"
                type="text"
                id="search"
                placeholder="Search courses..."
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className={`px-4 py-3 text-sm text-white ${!user && "hidden"}`}>
            <div>{user ? user.displayName : ""}</div>
            <div className="font-medium truncate">{user ? user.email : ""}</div>
          </div>
        </div>

        <ul className="py-2 text-sm text-gray-200">
          <li>
            <Link
              to="/"
              className="block lg:hidden px-4 py-2 hover:bg-gray-600 hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className="block lg:hidden px-4 py-2 hover:bg-gray-600 hover:text-white"
            >
              Courses
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        <div className="py-1">
          {user ? (
            <div
              className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
              onClick={handleLogout}
            >
              Log out
            </div>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
