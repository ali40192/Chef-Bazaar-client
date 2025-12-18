import React from "react";

const OurClients = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl text-[#E2852E] font-semibold mb-12">
          Our Clients
        </h2>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center">
          <img
            src="https://cdn.worldvectorlogo.com/logos/mcdonalds-6.svg"
            alt="McDonald's"
            className="w-full h-14 object-contain mx-auto"
          />

          <img
            src="https://cdn.worldvectorlogo.com/logos/kfc-4.svg"
            alt="KFC"
            className="w-full h-14 object-contain mx-auto"
          />

          <img
            src="https://cdn.worldvectorlogo.com/logos/subway-6.svg"
            alt="Subway"
            className="w-full h-14 object-contain mx-auto"
          />

          <img
            src="https://cdn.worldvectorlogo.com/logos/pizza-hut-3.svg"
            alt="Pizza Hut"
            className="w-full h-14 object-contain mx-auto"
          />

          <img
            src="https://cdn.worldvectorlogo.com/logos/burger-king-4.svg"
            alt="Burger King"
            className="w-full h-14 object-contain mx-auto"
          />
        </div>

        {/* Static dots */}
        <div className="flex justify-center mt-10 gap-2">
          <span className="w-3 h-3 bg-[#E2852E] rounded-full"></span>
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
