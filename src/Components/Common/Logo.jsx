import React from "react";
import logoImg from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="avatar w-20 rounded-full">
        <img src={logoImg} alt="" />
      </div>
      {/* <h1 className="text-xs text-[#F5C857] ">
        <span className="text-3xl font-bold text-[#E2852E]">Chef</span> Bazaar
      </h1> */}
    </div>
  );
};

export default Logo;
