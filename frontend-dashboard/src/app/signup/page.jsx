"use client";

import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! Please log in.");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google signup successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGithubSignup = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("GitHub signup successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex flex-col">
      <Navbar activePage="signup" />
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Signup
          </h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition"
            >
              Signup
            </button>
          </form>
          <div className="mt-6">
            <button
              onClick={handleGoogleSignup}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-md mb-4 hover:scale-105 transition"
            >
              Sign Up with Google
            </button>
            <button
              onClick={handleGithubSignup}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition"
            >
              Sign Up with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}