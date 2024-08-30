import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../../store/slice";
import { getDatabase, ref, get, update, push, set } from "firebase/database";
import app from "../../firebase/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";

const Enroll = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { courseId } = useParams();

  const dispatch = useDispatch();
  const { courseDetails, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourseDetails(courseId));
  }, [dispatch, courseId]);

  const onSubmit = async (data) => {
    const db = getDatabase(app);

    const newDocRef = push(
      ref(db, `learningGuru/courses/${courseId}/students`)
    );

    set(newDocRef, data)
      .then(() => {
        toast.success("Enrolled Successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (loading || !courseDetails) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen -mt-10 lg:py-0">
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
              <h1 className="text-xl font-semibold leading-tight tracking-tight md:text-xl text-white">
                Enroll into{" "}
                <span className="font-bold text-2xl">
                  '{courseDetails.name}'
                </span>{" "}
                course
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
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
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  Enroll
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Enroll;
