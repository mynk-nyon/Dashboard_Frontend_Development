"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg">
      <nav className="flex justify-between items-center">
        <h1 className="text-lg font-bold tracking-wide">Responsive App</h1>
        <div>
          {user ? (
            <>
              <span className="mr-4 font-semibold">{user.email || "Email not available"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="mr-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;