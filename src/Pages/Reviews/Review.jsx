import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import HomePageReview from "./HomePageReview";
import Loader from "../../Components/Common/Loader";

const Review = () => {
  const axiosSecure = useAxiosSecure();

  const { data: AllReview = [], isLoading } = useQuery({
    queryKey: ["reviewhome"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/reviewhome");
      return data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {AllReview.map((review) => (
          <SwiperSlide>
            <HomePageReview review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Review;
