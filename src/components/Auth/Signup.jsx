import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  emailPasswordSignUp,
  popUpSignIn,
  updateUserProfile,
} from "../../redux/thunks/authThunks";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    dispatch(popUpSignIn(googleProvider))
      .unwrap()
      .then(() => {
        toast.success("Logged in successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google sign-in failed:", error.message);
        toast.error(`Google sign-in failed: ${error.message}`);
      });
  };

  const handleEmailPasswordSignIn = (data, e) => {
    e.preventDefault();

    const { name, email, password } = data;

    dispatch(emailPasswordSignUp({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(updateUserProfile({ name }))
          .unwrap()
          .then(() => {
            toast.success("Profile updated successfully!");
          })
          .catch((error) => {
            console.error("Profile update failed:", error.message);
            toast.error(`Profile update failed: ${error.message}`);
          });

        toast.success("Signed up successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Email/password sign-up failed:", error.message);
        toast.error(`Sign-up failed: ${error.message}`);
      });
  };

  return (
    <div>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <img
              className="w-20 h-20 flex items-center justify-center"
              src="/public/logo_dark.ico"
              alt="logo"
            />
            <span className="-mt-5">Learning Guru</span>
          </Link>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Register your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(handleEmailPasswordSignIn)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span>This field is required</span>}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span>This field is required</span>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <span>This field is required</span>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Log In
                  </Link>
                </p>
              </form>
              <div>
                <h5 className="text-center font-bold">OR</h5>
                <button
                  className="w-full md:w-96 mt-5 flex gap-3 justify-center items-center"
                  onClick={handleGoogleSignIn}
                >
                  <AiFillGoogleCircle />
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Signup;
