import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchQuery } from "../../redux/slices/courseSlice";
import { checkAuthState } from "../../redux/thunks/authThunks";
import { setToggle } from "../../redux/slices/authSlice";
import UserProfileCard from "./UserProfileCard";
import { MdOutlineSearch } from "react-icons/md";

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
    <div className="mb-16">
      <nav className="flex items-center justify-between bg-black p-9 fixed top-0 z-20 w-[100vw]">
        <div className="flex items-center text-white mr-6 absolute">
          <Link>
            <img
              src="/logo.png"
              className="relative top-3 -left-4 md:-left-0 md:top-6 rounded-full w-20 md:w-32"
            />
          </Link>
          <span className="font-bold font-serif italic md:text-2xl tracking-tight -ml-4 z-10">
            <Link to="/" className="text-white hover:text-gray-400">
              Learning Guru
            </Link>
          </span>
        </div>
        <div className="flex items-center gap-8 text-lg absolute right-0 px-10 pr-16 -mt-8 md:-mt-0 md:pr-24">
          <div className="hidden md:inline">
            <div className="max-w-md mx-auto">
              <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-gray-500 overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <MdOutlineSearch className="h-6 w-6" />
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
          <div className="hidden lg:flex gap-6">
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
                <UserProfileCard
                  user={user}
                  toggle={toggle}
                  handleToggle={handleToggle}
                  handleSearchChange={handleSearchChange}
                />
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="hidden lg:inline-block font-semibold px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0"
                >
                  Log in
                </Link>
                <div className="lg:hidden absolute top-0">
                  <UserProfileCard
                    user={user}
                    toggle={toggle}
                    handleToggle={handleToggle}
                    handleSearchChange={handleSearchChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
