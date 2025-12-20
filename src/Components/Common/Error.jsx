import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-lg w-full bg-base-100 rounded-2xl shadow-lg p-8 text-center">
        {/* Animation */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-7xl font-bold text-primary"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl font-semibold"
        >
          Page Not Found
        </motion.h2>

        <p className="mt-3 text-gray-500">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
