import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hook/useAuth.js";
import MotionSection from "../../shared/MotionSection.jsx";
import debounce from "lodash/debounce";
import {
    validateUsername,
    validateEmail,
    validatePassword,
    getPasswordStrength,
} from "../utils/validation";
import { checkUsername } from "../services/auth.api.js";

{
    /* register page component */
}
const Register = () => {
    const { handleRegister, loading } = useAuth();

    {
        /* state for username, email and password */
    }
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [usernameStatus, setUsernameStatus] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const navigate = useNavigate();

    const handleCheckUsername = debounce(async (value) => {
        if (!value) return;

        try {
            const data = await checkUsername(value);
            if (data.available) {
                setUsernameStatus("Username available");
            } else {
                setUsernameStatus("Username taken");
            }
        } catch (err) {
            console.log(err);
        }
    }, 500);

    {
        /* function to handle form submission */
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        setRegisterError("");

    const usernameValidation = validateUsername(username)
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    setUsernameError(usernameValidation)
    setEmailError(emailValidation)
    setPasswordError(passwordValidation)

    // STOP INVALID SUBMIT
    if(
       usernameValidation ||
       emailValidation ||
       passwordValidation
    ){
       return;
    }

    // CALL HOOK
    try{
        await handleRegister( username, email, password)
        navigate("/")
    }catch(err){
        setRegisterError(
            err?.response?.data?.message ||
            "Registration failed. Please try again."
        )
    }
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
        );
    }

    {
        /* rendering the register form */
    }
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-black">
            <MotionSection className="w-full max-w-107.5 px-4 flex flex-col gap-6">
                <h1 className="text-3xl font-bold ">Register</h1>

                {/* form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* input for username */}
                    <input
                        className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => {
                            const value = e.target.value;
                            setUsername(value);
                            const error = validateUsername(value);
                            setUsernameError(error);
                            handleCheckUsername(value);
                        }}
                        placeholder="Enter username"
                    />

                    {
                        usernameError && (
                            <p className="text-red-500 text-sm">
                                {usernameError}
                            </p>
                        )
                    }

                    {
                        usernameStatus && (
                            <p className="text-sm text-zinc-400">
                                {usernameStatus}
                            </p>
                        )
                    }

                    {/* input for email */}
                    <input
                        className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                            const error = validateEmail(value);
                            setEmailError(error);
                        }}
                        placeholder="Enter Email"
                    />
                    {
                        emailError && (
                            <p className="text-red-500 text-sm">
                                {emailError}
                            </p>
                        )
                    }


                    {/* input for password */}
                    <div className="relative w-full">
                        <input
                            className="w-full px-6 py-3 pr-14 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => {
                                const value = e.target.value;
                                setPassword(value)
                                const error = validatePassword(value)
                                setPasswordError(error)
                                const strength =
                                    getPasswordStrength(value)
                                setPasswordStrength(strength)
                            }}
                            placeholder="Enter password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                >
                                    <path d="M3 3l18 18" />
                                    <path d="M10.58 10.58a2 2 0 102.83 2.83" />
                                    <path d="M9.88 5.09A9.77 9.77 0 0112 5c5 0 9.27 3.11 11 7-0.81 1.81-2.17 3.36-3.88 4.5" />
                                    <path d="M6.61 6.61C4.62 7.87 3.1 9.76 2 12c1.73 3.89 6 7 10 7 1.61 0 3.16-.4 4.53-1.12" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                >
                                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {
                        passwordError && (
                            <p className="text-red-500 text-sm">
                                {passwordError}
                            </p>
                        )
                    }
                    {
                        password && (
                            <p className="text-sm text-zinc-400">
                                Strength: {passwordStrength}
                            </p>
                        )
                    }

                    {registerError && (
                        <p className="text-sm text-red-400 font-medium" role="alert">
                            {registerError}
                        </p>
                    )}

                    {/* button to submit the form */}
                    <button
                        className="w-full px-6 py-3 rounded-full bg-red-500 text-white font-semibold cursor-pointer hover:bg-red-600 transition-transform duration-150 ease-in-out active:scale-95"
                        type="submit"
                    >
                        Register
                    </button>

                    {/* link to navigate to login page */}
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-red-500">
                            Login to Account
                        </Link>
                    </p>
                </form>
            </MotionSection>
        </main>
    );
};

export default Register;
