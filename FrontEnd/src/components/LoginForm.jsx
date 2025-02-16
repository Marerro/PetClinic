import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { postLogin } from "../helpers/post";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { getUser, error, setError } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const response = await postLogin(data);
      console.log(response);
      await getUser();
      if (response) {
        navigate("/main");
      } else {
        console.log("Login failed");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="text-white text-center grid items-center h-[20vh]"></div>
      <div className="mx-auto bg-violet-800 h-auto p-5 w-1/4 border border-[#252945]">
        <div>
          <h1 className="text-white text-center text-[25px] pt-10">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="block m-auto text-black p-4 border w-[220px] h-[25px] border-gray-300 rounded-lg text-center"
                />
                <p className="text-red-500 text-center">
                  {errors.email?.message}
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
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="block m-auto text-black p-4 border w-[220px] h-[25px] border-gray-300 rounded-lg text-center"
                />
                <p className="text-red-500 text-center">{errors.password?.message}</p>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 leading-6 text-center">{error}</p> }

              {/* Submit Button */}
              <div className="flex justify-center pt-8 pb-5">
                <button
                  type="submit"
                  className="w-[220px] h-[35px] text-gray-900 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-[#F7BE38]/90 focus:ring-1 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm text-center dark:focus:ring-[#F7BE38]/50"
                >
                  Login
                </button>
              </div>
              <p className="text-white text-center text-[19px] font-[200]">
                Don't have an account?
                <Link to="/register">
                  <span className="text-center text-blue-300 font-[200] text-[16px]">
                    <p>Register now</p>
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

export default Login;
