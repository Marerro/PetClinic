import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { postUser } from "../helpers/post";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { getUser, setError, error } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const response = await postUser(data);
      console.log(response);
      await getUser();
      if (response) {
        navigate("/main");
      } else {
        console.log("Registration failed");
      }
      return response.data;
    } catch (error) {
      console.error(error.response?.data.message);
      setError(error.response?.data.message);
    }
  };

  return (
    <>
      <div className="text-white text-center grid items-center h-[20vh]"></div>
      <div className="mx-auto bg-violet-800 h-auto p-5 w-1/4 border border-[#252945]">
        <div>
          <h1 className="text-white text-center text-[25px] pt-10">Register</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="flex flex-col gap-3 pt-8">
              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="block text-[25px] font-[500] text-white text-center"
                ></label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="block m-auto text-black p-4 border w-[220px] h-[25px] border-gray-300 rounded-lg text-center"
                />
                <p className="text-red-500 text-center">
                  {errors?.email?.message}
                </p>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block inconsolata text-[25px] font-[500] text-white text-center"
                ></label>
                <input
                  {...register("name", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters long",
                    },
                  })}
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="block m-auto p-4 border w-[220px] h-[25px] text-black border-gray-300 rounded-lg text-center"
                />
                <p className="text-red-500 text-center">
                  {errors?.name?.message}
                </p>
              </div>

              {/* Password */}
              <div>
              <label
                htmlFor="password"
                className="block text-[25px] font-[500] text-white text-center"
              ></label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                type="password"
                id="password"
                placeholder="Password"
                className="block m-auto text-black p-4 border w-[220px] h-[25px] border-gray-300 rounded-lg text-center"
              />
              <p className="text-red-500 text-center text-[15px]">{errors?.password?.message}</p>
              </div>

              <div>
              <label
                htmlFor="passwordconfirm"
                className="block text-[25px] font-[500] text-white text-center"
              ></label>
              <input
                {...register("passwordconfirm", {
                  required: "Password confirmation is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                type="password"
                id="passwordconfirm"
                placeholder="Password confirmation"
                className="block m-auto text-black p-4 border w-[220px] h-[25px] border-gray-300 rounded-lg text-center"
              />
              <p className="text-red-500 text-center text-[15px]">{errors?.passwordconfirm?.message}</p>
              </div>

              {error && <p className="text-red-500 leading-6 text-center">{error}</p> }

              {/* Submit Button */}
              <div className="flex justify-center pt-8 pb-5">
                <button
                  type="submit"
                  className="w-[220px] h-[35px] text-gray-900 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-[#F7BE38]/90 focus:ring-1 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm text-center dark:focus:ring-[#F7BE38]/50"
                >
                  Register
                </button>
              </div>
              <p className="text-white text-center text-[19px] font-[200]">
                Already have account? 
                <Link to="/login">
                  <span className="text-center text-blue-300 font-[200] text-[16px]">
                    <p>Log in now</p>
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
