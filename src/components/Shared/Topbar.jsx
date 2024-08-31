import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchQuery } from "../../redux/slices/courseSlice";
import { checkAuthState } from "../../redux/thunks/authThunks";
import { setToggle } from "../../redux/slices/authSlice";
import UserProfileCard from "./UserProfileCard";

const Topbar = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const { user, toggle } = useSelector((state) => state.auth);

  const handleToggle = () => {
    dispatch(setToggle());
  };

  return (
    <div>
      <nav className="flex items-center justify-between bg-black p-9 sticky top-0 z-20 w-[100vw]">
        <div className="flex items-center text-white mr-6 absolute">
          <Link>
            <img
              src="/public/logo.png"
              width={140}
              height={140}
              className="relative top-6 rounded-full"
            />
          </Link>
          <span className="font-bold font-serif italic text-2xl tracking-tight -ml-4 z-10">
            <Link to="/" className="text-white hover:text-gray-400">
              Learning Guru
            </Link>
          </span>
        </div>
        <div className="flex items-center gap-8 text-lg absolute right-0 px-10 pr-24">
          <div>
            <div className="max-w-md mx-auto">
              <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-gray-500 overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-sm text-white pl-2"
                  type="text"
                  id="search"
                  placeholder="Search courses..."
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <Link
              to="/"
              className="font-semibold mt-4 lg:mt-0 text-white hover:text-yellow-100 mr-4"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="font-semibold mt-4 lg:mt-0 text-white hover:text-yellow-100 mr-4"
            >
              Courses
            </Link>
          </div>
          <div>
            {user ? (
              <div className="absolute top-0">
                <div
                  className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-600 cursor-pointer"
                  type="button"
                  onClick={handleToggle}
                >
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
                </div>
                <UserProfileCard user={user} toggle={toggle} />
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-block font-semibold px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
