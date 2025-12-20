import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
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
    <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[500px] overflow-hidden rounded-xl">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background image (lazy) */}
              <img
                src={slide.img}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                alt={slide.title}
              />

              <div className="absolute inset-0 bg-black/40" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} //
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-20 text-white"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  {slide.title}
                </h2>

                <p className="mt-3 max-w-xl text-sm sm:text-base md:text-lg">
                  {slide.subtitle}
                </p>

                <button className="mt-5 w-fit px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-gray-100 transition">
                  Order Now
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
