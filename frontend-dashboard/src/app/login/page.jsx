"use client";

import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("GitHub login successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex flex-col">
      <Navbar user={auth.currentUser} />
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
            Welcome Back
          </h1>
          {error && (
            <p className="text-red-600 text-sm font-semibold mb-4 text-center">
              {error}
            </p>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Login
            </button>
          </form>
          <div className="mt-6 space-y-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Login with Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Login with GitHub
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
