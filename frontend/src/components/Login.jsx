import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setButtonClicked(!buttonClicked);
  };
  const buttonStyle = {
    backgroundColor: buttonClicked ? "white" : "#FC4747",
    color: buttonClicked ? "black" : "white",
    borderRadius: "8px",
  };
  // Below code is to send email, password to server/database
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are mandatory");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/login",
        { email, password }
      );
      const tokenNo = response.data.message;
      localStorage.setItem("token", tokenNo);
      navigate("/Home");
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "An error occurred during login.";
        alert(errorMessage);
      } else if (error.request) {
        alert("No response received from the server.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-lg p-6">
          <h1 className="text-white text-2xl font-semibold mb-6">Login </h1>
          <form
            className="max-w-md mx-auto text-white "
            style={{ backgroundColor: "161D2F" }}
            onSubmit={handleLogin}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer custom-cursor-color"
                placeholder=" "
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0  peer custom-cursor-color"
                placeholder=" "
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Password
              </label>
            </div>
            <button
              onClick={handleClick}
              style={buttonStyle}
              type="submit"
              className=" text-sm w-full px-5 py-2.5 text-center "
            >
              Login to your account
            </button>
            <div className="mx-4 my-5">
              <span>Don't have an account ? </span>
              <Link to="/Signup" style={{ color: "#FC4747" }}>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
