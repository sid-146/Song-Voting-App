"use client";
import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success message

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to sign up");
      }

      const data = await response.json();
      setSuccess("Account created successfully!");
      console.log("Response from server:", data);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-spotify-gray-dark p-8 rounded-lg w-full max-w-md">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="text-center">
            <i className="fab fa-spotify text-spotify-green text-5xl mb-4"></i>
            <h2 className="text-spotify-white text-2xl font-bold">Sign Up</h2>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm text-center">{success}</div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3.5 rounded bg-[#3E3E3E] border border-[#404040] text-spotify-white placeholder-spotify-gray-light focus:border-spotify-green focus:outline-none"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3.5 rounded bg-[#3E3E3E] border border-[#404040] text-spotify-white placeholder-spotify-gray-light focus:border-spotify-green focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3.5 rounded bg-[#3E3E3E] border border-[#404040] text-spotify-white placeholder-spotify-gray-light focus:border-spotify-green focus:outline-none"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-spotify-green text-black py-3.5 rounded-full font-bold tracking-wider hover:scale-105 transition-transform"
          >
            SIGN UP
          </button>

          <div className="text-center space-y-4">
            <div className="text-spotify-gray-light">
              Already have an account!{" "}
              <a
                href="/auth/login"
                className="text-spotify-white font-bold hover:text-spotify-green"
              >
                Login Here
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
