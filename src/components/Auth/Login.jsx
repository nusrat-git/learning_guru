import React from "react";
import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import app from "../../firebase/firebaseConfig";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "learningGuru/users"));
    set(newDocRef, data)
      .then(() => {
        alert("data saved successfully");
      })
      .catch((error) => {
        alert("error: ", error.message);
      });
  };

  // const sendData = async (e) => {
  //   e.preventDefault();

  //   const db = getDatabase(app);
  //   const newDocRef = push(ref(db, "learningGuru/courses"));
  //   set(newDocRef, {})
  //     .then(() => {
  //       alert("data saved successfully");
  //     })
  //     .catch((error) => {
  //       alert("error: ", error.message);
  //     });
  // };

  // const fetchData = async () => {
  //   const db = getDatabase(app);
  //   const dbRef = ref(db, "learningGuru/users");
  //   const snapshot = await get(dbRef);
  //   if (snapshot.exists()) {
  //     setFruitArray(Object.values(snapshot.val()));
  //   } else {
  //     alert("error");
  //   }
  // };

  return (
    <div>
      {/* <button onClick={fetchData}> Display Data </button> */}
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                Log in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                        className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forget-password"
                    className="text-sm font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Register
                  </Link>
                </p>
              </form>

              <div>
                <h5 className="text-center font-bold">OR</h5>
                <button className="w-96 mt-5 flex justify-center items-center">
                  <AiFillGoogleCircle />
                  <Link className="mx-2 font-semibold text-white" to="/">
                    Continue with Google{" "}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
