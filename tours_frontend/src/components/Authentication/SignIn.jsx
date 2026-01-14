import React, { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn, Moon, Sun } from "lucide-react";

import googleIMg from "../../assets/Images/Google.svg.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/API/API";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const SignIn = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedTokenRole = token ? jwtDecode(token).role : null;
  const { loading } = useSelector((state) => state.user);

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let credentials = {
      email,
      password,
    };

    dispatch(userLogin(credentials)).then((result) => {
      console.log(result);

      if (result?.payload === undefined) {
        console.log(result?.payload?.error);
        setEmail("");
        setPassword("");
      toast.info("try again!")
      }
        // else if(!result.ok){
        //   toast.error('error occured')
        //   setEmail("");
        //   setPassword("");
        // }
       else {
        console.log("login successfully");
        localStorage.setItem("token", result.payload.data);
        navigate(
          decodedTokenRole === "ROLE_ADMIN"
            ? "/admin/dashboard"
            : "/user/dashboard"
        );
      }
    });
  };

  useEffect(() => {
    if (token) {
      navigate(
        decodedTokenRole === "ROLE_ADMIN"
          ? "/admin/dashboard"
          : "/user/dashboard"
      );
    }
  }, [token, decodedTokenRole, navigate]);

  if (loading) {
    return <div className="flex justify-center font-bold">loading...</div>;
  }

  const googleLogin = () => {
    window.open("http://localhost:8080/oauth2/authorization/google", "_self");
  };

  return (
    <>
      <div className={darkMode ? "dark" : ""}>
        <div className="flex flex-col justify-center flex-1 min-h-screen px-6 py-8 lg:px-8 dark:bg-slate-900">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {darkMode ? (
              <LogIn className="m-auto text-white size-14" />
            ) : (
              <LogIn className="m-auto size-14" />
            )}

            <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900 dark:text-slate-200">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full mt-1 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mt-1 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-6 text-sm text-center text-gray-500">
              Not a member?{" "}
              <Link
                to="/SignUp"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Sign Up
              </Link>
            </p>

            <p className="mt-3 text-sm text-center text-gray-900 dark:text-white">
              or continue with
            </p>
            <button
              className="mt-3 flex items-center w-40 m-auto justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white text-black border border-slate-400 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={googleLogin}
            >
              <img src={googleIMg} alt="Google" className="mr-2 size-4" />
              Google
            </button>
          </div>
        </div>
        <div className="absolute top-5 right-5 md:right-12">
          <button
            className={
              darkMode
                ? "border border-white size-8 rounded-lg flex items-center justify-center shadow-lg"
                : "border border-black size-8 rounded-lg flex items-center justify-center shadow-lg"
            }
            onClick={toggle}
          >
            {darkMode ? <Moon className="text-white" /> : <Sun />}
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
