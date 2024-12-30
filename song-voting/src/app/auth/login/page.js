"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login validation logic here

    // For now, just redirect if both fields have values
    if (username && password) {
      router.push("/songs");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-spotify-gray-dark p-8 rounded-lg w-full max-w-md">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="text-center">
            <i className="fab fa-spotify text-spotify-green text-5xl mb-4"></i>
            <h2 className="text-spotify-white text-2xl font-bold">Login</h2>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Email address or username"
              className="w-full p-3.5 rounded bg-[#3E3E3E] border border-[#404040] text-spotify-white placeholder-spotify-gray-light focus:border-spotify-green focus:outline-none"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember-me"
              className="w-4 h-4 bg-[#3E3E3E] border-[#404040] rounded focus:ring-spotify-green"
            />
            <label
              className="text-spotify-gray-light text-sm"
              htmlFor="remember-me"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="bg-spotify-green text-black py-3.5 rounded-full font-bold tracking-wider hover:scale-105 transition-transform"
          >
            LOG IN
          </button>

          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#404040]"></div>
            </div>
            <span className="relative bg-spotify-gray-dark px-4 text-spotify-gray-light text-sm">
              or
            </span>
          </div>

          <div className="space-y-3">
            {["google", "facebook", "apple"].map((provider) => (
              <button
                key={provider}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 border border-[#404040] rounded-full text-spotify-white font-bold hover:border-spotify-white transition-colors"
              >
                <i className={`fab fa-${provider} text-lg`}></i>
                <span>
                  Continue with{" "}
                  {provider.charAt(0).toUpperCase() + provider.slice(1)}
                </span>
              </button>
            ))}
          </div>

          <div className="text-center space-y-4">
            <a
              href="#"
              className="text-spotify-gray-light hover:text-spotify-green text-sm"
            >
              Forgot your password?
            </a>
            <div className="text-spotify-gray-light">
              Don't have an account?{" "}
              <a
                href="/auth/signup"
                className="text-spotify-white font-bold hover:text-spotify-green"
              >
                Sign up for Spotify
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
