import React from "react";
import { Link } from "react-router";
import logoImg from "../assets/logo.png";

const MessagePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col items-center bg-primary text-white rounded-3xl shadow-2xl p-8 w-full max-w-xl">
        {/* Logo */}
        <img
          src={logoImg}
          alt="Logo"
          className="w-24 h-24 rounded-full mb-4 shadow-md bg-white p-2"
        />

        {/* Title */}
        <h2 className="text-3xl font-bold mb-3 text-center tracking-wide">
          Welcome to Chef Bazaar!
        </h2>

        {/* Description */}
        <p className="mb-6 text-center text-white/90 leading-relaxed">
          Thanks for visiting our website. Stay connected with us on social
          media.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6 mb-6">
          <a
            className="hover:scale-110 transition-transform duration-300"
            href="#"
          >
            {/* Facebook */}
            <svg viewBox="0 0 64 64" height="56" width="56">
              {/* SVG unchanged */}
              {/* ... */}
            </svg>
          </a>

          <a
            className="hover:scale-110 transition-transform duration-300"
            href="#"
          >
            {/* Twitter */}
            <svg viewBox="0 0 64 64" height="56" width="56">
              {/* SVG unchanged */}
              {/* ... */}
            </svg>
          </a>

          <a
            className="hover:scale-110 transition-transform duration-300"
            href="#"
          >
            {/* YouTube */}
            <svg viewBox="0 0 64 64" height="56" width="56">
              {/* SVG unchanged */}
              {/* ... */}
            </svg>
          </a>
        </div>

        {/* Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-gradient-to-r from-[#AA2B1D] to-[#CC561E]
          text-white font-semibold py-2 px-6 rounded-full
          shadow-lg hover:scale-105 transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
