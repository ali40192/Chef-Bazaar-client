import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Fresh Home-Cooked Meals",
    subtitle: "Order delicious meals prepared by local home chefs.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: 2,
    title: "Support Local Chefs",
    subtitle: "Choose from various dishes prepared with love.",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  },
  {
    id: 3,
    title: "Fast & Safe Delivery",
    subtitle: "Get your food delivered hot and fresh.",
    img: "https://i.ibb.co/Tx4tCjtZ/chad-montano-Mq-T0asuo-Ic-U-unsplash.jpg",
  },
];

const Banner = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[380px] md:h-[450px] lg:h-[520px] xl:h-[600px] overflow-hidden rounded-xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={slide.img}
                className="w-full h-full object-cover"
                alt="banner"
              />

              {/* Framer Motion Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center px-6 sm:px-10 lg:px-20"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-white text-sm sm:text-base md:text-lg lg:text-xl mt-3 max-w-xl drop-shadow-md"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-5 px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Order Now
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
