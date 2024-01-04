import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
const Signup = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConPassword] = useState();
  const [errorMessages, setErrorMessages] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const navigate = useNavigate();
  const handleClick = () => {
    setButtonClicked(!buttonClicked);
  };
  const buttonStyle = {
    backgroundColor: buttonClicked ? "white" : "#FC4747",
    color: buttonClicked ? "black" : "white",
    borderRadius: "8px",
  };
  //    {Below code is for use POST method}
  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!email) {
      errors.emailError = "Please enter your email";
    } else if (!password) {
      errors.passwordError = "Please enter your password";
    } else if (!confirmPassword) {
      errors.confirmPasswordError = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPasswordError = "Passwords do not match";
      alert("Passwords and confirm passworkd do not match");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/user/signUp",
          { email, password, confirmPassword }
        );
        // console.log(response.data);
        alert("You have successfully created an account");
        navigate("/Login");
      } catch (error) {
        // console.error("Signup error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert(error.message);
        }
      }
    }
    setErrorMessages(errors);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-lg p-6">
          <h1 className="text-white text-2xl font-semibold mb-6">Sign Up</h1>
          <form
            className="max-w-md mx-auto text-white "
            style={{ backgroundColor: "161D2F" }}
            onSubmit={handleSignup}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer custom-cursor-color"
                placeholder=""
                required
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                {errorMessages.emailError && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorMessages.emailError}
                  </p>
                )}
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
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                {errorMessages.emailError && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorMessages.passwordError}
                  </p>
                )}
                Password
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="repeat_password"
                id="floating_repeat_password"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer custom-cursor-color"
                placeholder=" "
                required
                autoComplete="new-password"
                onChange={(e) => setConPassword(e.target.value)}
              />
              <label
                htmlFor="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                {errorMessages.emailError && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorMessages.passwordError}
                  </p>
                )}
                Confirm password
              </label>
            </div>
            <button
              onClick={handleClick}
              style={buttonStyle}
              type="submit"
              className=" text-sm w-full px-5 py-2.5 text-center "
            >
              Create an account
            </button>
            <div className="mx-4 my-5">
              <span>Alreaddy have an account ? </span>

              <Link to="/Login" style={{ color: "#FC4747" }}>
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
