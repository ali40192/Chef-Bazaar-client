import React from "react";

const MealCards = ({ meal }) => {
  const { chefName, chefId, foodImage, price, rating } = meal;
  return (
    <div className="border border-yellow-500 rounded-xl shadow-xl p-4 w-80 bg-white hover:shadow-2xl transition relative hover:scale-105">
      {/* Food Image */}
      <div className="relative flex justify-center items-center">
        <img
          src={foodImage}
          alt="Food"
          className="h-40 object-contain mt-4 rounded-md"
        />
      </div>

      {/* Rating */}
      <div className="rating flex justify-center mt-6">Rating: {rating}</div>

      {/* Chef Info */}
      <h3 className="text-center font-bold text-lg mt-2">{chefName}</h3>
      <p className="text-center text-sm text-gray-600 mb-4">
        Chef ID: {chefId}
      </p>

      {/* Divider */}
      <div className="flex justify-center my-3">
        <div className="w-28 border-b border-red-700 relative">
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-1 text-red-700 text-xl">
            •
          </span>
        </div>
      </div>

      {/* Price */}
      <p className="text-center text-xl font-semibold text-gray-800">
        ${price}
      </p>

      {/* Delivery Area */}
      <p className="text-center text-sm mt-1 text-gray-600">
        Delivery Area: Dhake
      </p>

      {/* DaisyUI Details Button */}
      <button className="btn btn-error w-full mt-4 text-white">
        See Details
      </button>
    </div>
  );
};

export default MealCards;
