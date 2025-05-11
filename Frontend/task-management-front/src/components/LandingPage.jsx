import React from "react";

import Landing from "../assets/landing.png";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import Home from "./Home";

export default function LandingPage() {
  const { token } = useSelector((state) => state.auth);

  if (token) return <Home />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <header className="py-12 md:py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          TaskMaster
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Simple task management for productive people
        </p>

        <div className="mt-8 md:mt-12">
          <img
            src={Landing}
            alt="Task management illustration"
            className="mx-auto w-48 h-48 md:w-60 md:h-60 max-w-lg rounded-lg"
          />
        </div>
      </header>

      {/* Key Features */}
      <section className="py-10 md:py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Why Choose TaskMaster?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50">
            <div className="text-blue-500 dark:text-blue-400 text-4xl mb-4">
              ✓
            </div>
            <h3 className="font-bold mb-2 text-gray-800 dark:text-white">
              Simple
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Intuitive interface that anyone can use
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50">
            <div className="text-blue-500 dark:text-blue-400 text-4xl mb-4">
              ⚡
            </div>
            <h3 className="font-bold mb-2 text-gray-800 dark:text-white">
              Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get more done in less time
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50">
            <div className="text-blue-500 dark:text-blue-400 text-4xl mb-4">
              🔄
            </div>
            <h3 className="font-bold mb-2 text-gray-800 dark:text-white">
              Sync
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Works across all your devices
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-blue-600 dark:bg-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Ready to boost your productivity?
          </h2>
          <Link to={"/signup"}>
            <button className="bg-white text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-50 transition-colors">
              Sign Up Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}
