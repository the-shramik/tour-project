import React, { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn, Moon, Sun } from "lucide-react";

import googleIMg from "../../assets/images/Google.svg.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignUP } from "../../Redux/API/API";

const SignUp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Only proceed if terms are agreed
    if (!agreedToTerms) {
      alert("Please agree to the Terms and Policies");
      return;
    }

    let credentials = {
      name,
      email,
      password,
      enabled: agreedToTerms, // Only set to true if terms are agreed
    };

    dispatch(userSignUP(credentials)).then((res) => {
      console.log(res);
      if (res?.payload?.error) {
        console.log(res?.payload?.error);
        setName("");
        setPassword("");
        setEmail("");
      } else {
        navigate("/");
        console.error("created");
      }
    });
  };

  const openTermsModal = () => {
    alert("Terms and Policies - This is a placeholder for actual terms.");
  };

  const googleLogin = () => {
    window.open("http://localhost:8080/oauth2/authorization/google", "_self");
  };

  return (
    <>
      <div className={darkMode ? "dark" : ""}>
        <div className="flex flex-col justify-center flex-1 min-h-screen px-6 py-4 lg:px-8 dark:bg-slate-900">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {darkMode ? (
              <LogIn className="m-auto text-white size-14" />
            ) : (
              <LogIn className="m-auto size-14" />
            )}

            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900 dark:text-slate-200">
              Sign Up
            </h2>
          </div>

          <div className="relative mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md"
                  />
                </div>
              </div>

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
                    className="block w-full rounded-md"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Password
                  </label>
                </div>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="terms"
                  className="block ml-2 text-sm text-gray-900 dark:text-slate-200"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={openTermsModal}
                    className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Terms and Policies
                  </button>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  // disabled={!agreedToTerms}
                >
                  {loading ? "loading" : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="mt-5 text-sm text-center text-gray-500">
              Already a member?{" "}
              <Link
                to="/"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Sign In
              </Link>
            </p>

            <p className="mt-3 text-sm text-center text-gray-900 dark:text-white">
              or continue with
            </p>
            <button className="mt-3 flex items-center w-40 m-auto justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white text-black border border-slate-400 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={googleLogin}>
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

export default SignUp;
