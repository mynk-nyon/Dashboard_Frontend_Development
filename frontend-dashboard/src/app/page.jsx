"use client";

import { useRouter } from "next/navigation"; // Import useRouter
import Navbar from "./components/Navbar"; // Adjust the path as needed
import Login from "./login/page"; // Ensure these paths are correct
import Signup from "./signup/page"; 
import Dashboard from "./dashboard/page"; 

export default function Home() {
  const router = useRouter(); // Use router here

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white p-8 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-bold mb-2">Welcome to Your App</h1>
          <p className="text-lg">Manage your content seamlessly with our platform.</p>
          <div className="mt-4">
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-blue-600 py-2 px-4 rounded mr-4"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="bg-green-600 text-white py-2 px-4 rounded"
            >
              Signup
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Feature 1</h2>
            <p className="text-gray-700">Description of feature 1 goes here.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Feature 2</h2>
            <p className="text-gray-700">Description of feature 2 goes here.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Feature 3</h2>
            <p className="text-gray-700">Description of feature 3 goes here.</p>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-200 p-8 rounded-lg shadow-lg mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-4">Join our community and start managing your content today!</p>
          <button
            onClick={() => router.push("/signup")}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Sign Up Now
          </button>
        </section>
      </main>
    </div>
  );
}
